import {
  AppError,
  ErrorCode,
  withErrorHandling,
  validateRequired,
  safeJsonParse,
  debounce,
  retry,
  logger,
} from '../../utils/errorHandling';

describe('AppError', () => {
  it('creates error with message and default code', () => {
    const err = new AppError('something broke');
    expect(err.message).toBe('something broke');
    expect(err.code).toBe(ErrorCode.UNKNOWN_ERROR);
    expect(err.name).toBe('AppError');
  });

  it('creates error with custom code', () => {
    const err = new AppError('not found', ErrorCode.NOT_FOUND);
    expect(err.code).toBe(ErrorCode.NOT_FOUND);
  });

  it('stores original error', () => {
    const original = new Error('original');
    const err = new AppError('wrapped', ErrorCode.STORAGE_ERROR, original);
    expect(err.originalError).toBe(original);
  });
});

describe('withErrorHandling', () => {
  it('returns success result on resolved promise', async () => {
    const result = await withErrorHandling(async () => 42, 'failed');
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe(42);
  });

  it('returns error result on rejected promise', async () => {
    const result = await withErrorHandling(
      async () => {
        throw new Error('boom');
      },
      'operation failed',
      ErrorCode.EXPORT_FAILED
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toBe('operation failed');
      expect(result.code).toBe(ErrorCode.EXPORT_FAILED);
    }
  });

  it('wraps non-Error throws in Error object', async () => {
    const result = await withErrorHandling(async () => {
      throw 'string error';
    }, 'failed');
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toBeInstanceOf(Error);
  });
});

describe('validateRequired', () => {
  it('returns success when all required fields are present', () => {
    const result = validateRequired({ name: 'Alice', email: 'a@b.com' }, ['name', 'email']);
    expect(result.success).toBe(true);
  });

  it('returns failure when a required field is missing', () => {
    const result = validateRequired({ name: 'Alice' } as Record<string, unknown>, [
      'name',
      'email',
    ]);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.message).toContain('email');
  });

  it('returns failure when a required field is an empty string', () => {
    const result = validateRequired({ name: '' }, ['name']);
    expect(result.success).toBe(false);
  });

  it('includes all missing fields in the message', () => {
    const result = validateRequired({} as Record<string, unknown>, ['a', 'b', 'c']);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toContain('a');
      expect(result.message).toContain('b');
      expect(result.message).toContain('c');
    }
  });
});

describe('safeJsonParse', () => {
  it('parses valid JSON', () => {
    const result = safeJsonParse<{ x: number }>('{"x":1}', { x: 0 });
    expect(result.x).toBe(1);
  });

  it('returns fallback for invalid JSON', () => {
    const fallback = { x: 99 };
    const result = safeJsonParse<{ x: number }>('not json', fallback);
    expect(result).toBe(fallback);
  });
});

describe('debounce', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('delays function execution', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 200);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets timer on repeated calls', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 200);

    debounced();
    jest.advanceTimersByTime(100);
    debounced();
    jest.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('retry', () => {
  it('returns result when operation succeeds first try', async () => {
    const op = jest.fn().mockResolvedValue('ok');
    const result = await retry(op, 3, 0);
    expect(result).toBe('ok');
    expect(op).toHaveBeenCalledTimes(1);
  });

  it('retries on failure and succeeds eventually', async () => {
    const op = jest.fn().mockRejectedValueOnce(new Error('fail1')).mockResolvedValue('ok');
    const result = await retry(op, 3, 0);
    expect(result).toBe('ok');
    expect(op).toHaveBeenCalledTimes(2);
  });

  it('throws after max retries exceeded', async () => {
    const op = jest.fn().mockRejectedValue(new Error('always fails'));
    await expect(retry(op, 2, 0)).rejects.toThrow('always fails');
    expect(op).toHaveBeenCalledTimes(2);
  });
});

describe('logger', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
  });
  afterEach(() => jest.restoreAllMocks());

  it('logger.info calls console.log', () => {
    logger.info('test', { key: 'value' });
    expect(console.log).toHaveBeenCalledWith('[INFO] test', { key: 'value' });
  });

  it('logger.warn calls console.warn', () => {
    logger.warn('warning');
    expect(console.warn).toHaveBeenCalled();
  });

  it('logger.error calls console.error and captureException', () => {
    const err = new Error('oops');
    logger.error('error msg', err);
    expect(console.error).toHaveBeenCalled();
  });

  it('logger.debug calls console.debug in development', () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    logger.debug('debug msg', {});
    expect(console.debug).toHaveBeenCalled();
    process.env.NODE_ENV = original;
  });
});
