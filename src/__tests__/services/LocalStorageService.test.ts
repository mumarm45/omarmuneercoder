import { LocalStorageService } from '../../services/LocalStorageService';

// Full Map-based localStorage for these tests (overrides the jest.fn() mock in setupTests)
function makeLocalStorageMock() {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
    get length() {
      return store.size;
    },
    key: (index: number) => Array.from(store.keys())[index] ?? null,
  };
}

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: makeLocalStorageMock(),
    writable: true,
    configurable: true,
  });
});

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = new LocalStorageService({ prefix: 'test-app', version: '1.0' });
  });

  describe('save', () => {
    it('saves data and returns success result', async () => {
      const result = await service.save('my-key', { foo: 'bar' });
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ foo: 'bar' });
    });

    it('persists data so get can retrieve it', async () => {
      await service.save('persist-key', [1, 2, 3]);
      const result = await service.get<number[]>('persist-key');
      expect(result.success).toBe(true);
      expect(result.data).toEqual([1, 2, 3]);
    });
  });

  describe('get', () => {
    it('returns failure when key does not exist', async () => {
      const result = await service.get('missing-key');
      expect(result.success).toBe(false);
      expect(result.message).toContain('missing-key');
    });

    it('retrieves complex objects correctly', async () => {
      const obj = { name: 'Alice', scores: [90, 95], active: true };
      await service.save('complex', obj);
      const result = await service.get<typeof obj>('complex');
      expect(result.success).toBe(true);
      expect(result.data).toEqual(obj);
    });
  });

  describe('delete', () => {
    it('deletes an existing key and returns success', async () => {
      await service.save('to-delete', 'value');
      const result = await service.delete('to-delete');
      expect(result.success).toBe(true);

      const check = await service.get('to-delete');
      expect(check.success).toBe(false);
    });

    it('succeeds even if key does not exist', async () => {
      const result = await service.delete('nonexistent');
      expect(result.success).toBe(true);
    });
  });

  describe('exists', () => {
    it('returns true when key exists', async () => {
      await service.save('exists-key', 'data');
      const result = await service.exists('exists-key');
      expect(result.success).toBe(true);
      expect(result.data).toBe(true);
    });

    it('returns false when key does not exist', async () => {
      const result = await service.exists('no-such-key');
      expect(result.success).toBe(true);
      expect(result.data).toBe(false);
    });
  });

  describe('list', () => {
    it('returns all keys under the app prefix', async () => {
      await service.save('key-a', 1);
      await service.save('key-b', 2);
      const result = await service.list();
      expect(result.success).toBe(true);
      expect(result.data).toContain('key-a');
      expect(result.data).toContain('key-b');
    });

    it('filters keys by prefix when provided', async () => {
      await service.save('resume:1', 'data1');
      await service.save('resume:2', 'data2');
      await service.save('other:1', 'data3');
      const result = await service.list('resume');
      expect(result.success).toBe(true);
      expect(result.data?.some((k) => k.startsWith('resume'))).toBe(true);
    });
  });

  describe('clear', () => {
    it('clears all keys under the app prefix', async () => {
      await service.save('k1', 'v1');
      await service.save('k2', 'v2');
      await service.clear();
      const result = await service.list();
      expect(result.data).toHaveLength(0);
    });
  });

  describe('getStats', () => {
    it('returns total key count', async () => {
      await service.save('s1', 'v1');
      await service.save('s2', 'v2');
      const result = await service.getStats();
      expect(result.success).toBe(true);
      expect(result.data?.totalKeys).toBeGreaterThanOrEqual(2);
    });

    it('returns totalSize in bytes', async () => {
      await service.save('size-test', 'hello');
      const result = await service.getStats();
      expect(result.success).toBe(true);
      expect(result.data?.totalSize).toBeGreaterThan(0);
    });
  });
});
