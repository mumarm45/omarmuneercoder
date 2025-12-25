// src/utils/errorHandling.ts

/**
 * Standard error response structure
 */
export interface ErrorResult {
  success: false;
  message: string;
  code?: string;
  error?: Error;
}

/**
 * Standard success response structure
 */
export interface SuccessResult<T = unknown> {
  success: true;
  message: string;
  data?: T;
}

/**
 * Union type for operation results
 */
export type OperationResult<T = unknown> = SuccessResult<T> | ErrorResult;

/**
 * Error codes for different types of failures
 */
export enum ErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  INVALID_INPUT = 'INVALID_INPUT',
  EXPORT_FAILED = 'EXPORT_FAILED',
  STORAGE_ERROR = 'STORAGE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Custom application error class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Wraps async operations with error handling
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  errorMessage: string,
  errorCode: ErrorCode = ErrorCode.UNKNOWN_ERROR
): Promise<OperationResult<T>> {
  try {
    const result = await operation();
    return {
      success: true,
      message: 'Operation completed successfully',
      data: result,
    };
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    return {
      success: false,
      message: errorMessage,
      code: errorCode,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

/**
 * Validates required fields
 */
export function validateRequired<T extends Record<string, unknown>>(
  data: T,
  requiredFields: (keyof T)[]
): OperationResult<T> {
  const missingFields = requiredFields.filter(
    (field) => !data[field] || (typeof data[field] === 'string' && !String(data[field]).trim())
  );

  if (missingFields.length > 0) {
    return {
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`,
      code: ErrorCode.INVALID_INPUT,
    };
  }

  return {
    success: true,
    message: 'Validation passed',
    data,
  };
}

/**
 * Safely parses JSON with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    console.warn('Failed to parse JSON, using fallback value');
    return fallback;
  }
}

/**
 * Creates a debounced function
 */
export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Retry logic for failed operations
 */
export async function retry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)));
      }
    }
  }

  throw lastError || new Error('Operation failed after retries');
}

/**
 * Logger utility with different levels
 */
export const logger = {
  info: (message: string, data?: unknown) => {
    console.log(`[INFO] ${message}`, data || '');
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, data || '');
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error || '');
  },
  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  },
};
