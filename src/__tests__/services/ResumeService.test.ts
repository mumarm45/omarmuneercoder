import { ResumeService } from '../../services/ResumeService';
import { IStorageService, StorageResult } from '../../services/IStorageService';
import { ResumeData } from '../../types';

const sampleData: ResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    title: 'Engineer',
    email: 'jane@example.com',
    phone: '555-0000',
    location: 'NYC',
    linkedin: 'linkedin.com/in/jane',
    portfolio: 'jane.dev',
  },
  summary: 'Experienced engineer.',
  experience: [],
  education: [],
  skills: ['TypeScript', 'React', 'Node.js', 'AWS', 'Docker'],
};

function makeStorageMock(): jest.Mocked<IStorageService> {
  const store = new Map<string, unknown>();
  return {
    save: jest.fn(async <T>(key: string, data: T): Promise<StorageResult<T>> => {
      store.set(key, data);
      return { success: true, data };
    }),
    get: jest.fn(async <T>(key: string): Promise<StorageResult<T>> => {
      if (store.has(key)) return { success: true, data: store.get(key) as T };
      return { success: false, message: `Key "${key}" not found` };
    }),
    delete: jest.fn(async (key: string): Promise<StorageResult<void>> => {
      store.delete(key);
      return { success: true };
    }),
    exists: jest.fn(async (key: string): Promise<StorageResult<boolean>> => ({
      success: true,
      data: store.has(key),
    })),
    list: jest.fn(async (): Promise<StorageResult<string[]>> => ({
      success: true,
      data: Array.from(store.keys()),
    })),
    clear: jest.fn(async (): Promise<StorageResult<void>> => {
      store.clear();
      return { success: true };
    }),
    getStats: jest.fn(async () => ({
      success: true,
      data: { totalKeys: store.size, totalSize: 0 },
    })),
  };
}

describe('ResumeService', () => {
  let storage: jest.Mocked<IStorageService>;
  let service: ResumeService;

  beforeEach(() => {
    storage = makeStorageMock();
    service = new ResumeService(storage);
  });

  describe('create', () => {
    it('creates a resume and returns it with an ID', async () => {
      const result = await service.create('My Resume', sampleData);
      expect(result.success).toBe(true);
      expect(result.data?.id).toBeDefined();
      expect(result.data?.name).toBe('My Resume');
    });

    it('calculates completeness score', async () => {
      const result = await service.create('Complete', sampleData);
      expect(result.data?.metadata?.completenessScore).toBeGreaterThan(0);
    });

    it('adds resume to the list', async () => {
      await service.create('Listed Resume', sampleData);
      const list = await service.list();
      expect(list.data?.some(r => r.name === 'Listed Resume')).toBe(true);
    });
  });

  describe('get', () => {
    it('retrieves a created resume by ID', async () => {
      const { data: created } = await service.create('Fetch Me', sampleData);
      const result = await service.get(created!.id);
      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('Fetch Me');
    });

    it('returns failure for non-existent ID', async () => {
      const result = await service.get('no-such-id');
      expect(result.success).toBe(false);
    });
  });

  describe('update', () => {
    it('updates resume data', async () => {
      const { data: created } = await service.create('Original', sampleData);
      const updatedData = { ...sampleData, summary: 'Updated summary' };
      const result = await service.update(created!.id, { data: updatedData });
      expect(result.success).toBe(true);
      expect(result.data?.data.summary).toBe('Updated summary');
    });

    it('increments the version on each update', async () => {
      const { data: created } = await service.create('Versioned', sampleData);
      const r1 = await service.update(created!.id, { name: 'v2' });
      const r2 = await service.update(created!.id, { name: 'v3' });
      expect(r2.data?.metadata?.version).toBeGreaterThan(r1.data?.metadata?.version ?? 0);
    });

    it('returns failure for non-existent resume', async () => {
      const result = await service.update('ghost', { name: 'x' });
      expect(result.success).toBe(false);
    });
  });

  describe('delete', () => {
    it('removes the resume from storage', async () => {
      const { data: created } = await service.create('Delete Me', sampleData);
      await service.delete(created!.id);
      const check = await service.get(created!.id);
      expect(check.success).toBe(false);
    });

    it('removes the resume from the list', async () => {
      const { data: created } = await service.create('Remove From List', sampleData);
      await service.delete(created!.id);
      const list = await service.list();
      expect(list.data?.some(r => r.id === created!.id)).toBe(false);
    });
  });

  describe('list', () => {
    it('returns all created resumes', async () => {
      await service.create('Alpha', sampleData);
      await service.create('Beta', sampleData);
      const result = await service.list();
      expect(result.success).toBe(true);
      expect(result.data?.length).toBeGreaterThanOrEqual(2);
    });

    it('sorts resumes by updatedAt descending', async () => {
      await service.create('First', sampleData);
      await service.create('Second', sampleData);
      const result = await service.list();
      const dates = result.data!.map(r => new Date(r.updatedAt).getTime());
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
      }
    });
  });

  describe('duplicate', () => {
    it('creates a copy with a different ID', async () => {
      const { data: original } = await service.create('Original', sampleData);
      const result = await service.duplicate(original!.id);
      expect(result.success).toBe(true);
      expect(result.data?.id).not.toBe(original!.id);
    });

    it('uses custom name for duplicate', async () => {
      const { data: original } = await service.create('Source', sampleData);
      const result = await service.duplicate(original!.id, 'Custom Copy');
      expect(result.data?.name).toBe('Custom Copy');
    });

    it('appends "(Copy)" when no name is given', async () => {
      const { data: original } = await service.create('Source', sampleData);
      const result = await service.duplicate(original!.id);
      expect(result.data?.name).toBe('Source (Copy)');
    });
  });

  describe('search', () => {
    it('returns resumes matching the name', async () => {
      await service.create('React Developer', sampleData);
      await service.create('Python Engineer', sampleData);
      const result = await service.search('react');
      expect(result.data?.some(r => r.name === 'React Developer')).toBe(true);
      expect(result.data?.some(r => r.name === 'Python Engineer')).toBe(false);
    });

    it('returns empty array when no match', async () => {
      await service.create('Angular Dev', sampleData);
      const result = await service.search('xyz-not-found');
      expect(result.data).toHaveLength(0);
    });
  });

  describe('toggleFavorite', () => {
    it('marks a resume as favorite', async () => {
      const { data: created } = await service.create('Fave', sampleData);
      const result = await service.toggleFavorite(created!.id);
      expect(result.data?.metadata?.favorite).toBe(true);
    });

    it('un-marks a favorite resume', async () => {
      const { data: created } = await service.create('Fave', sampleData);
      await service.toggleFavorite(created!.id);
      const result = await service.toggleFavorite(created!.id);
      expect(result.data?.metadata?.favorite).toBe(false);
    });
  });

  describe('getFavorites', () => {
    it('returns only favorited resumes', async () => {
      const { data: a } = await service.create('A', sampleData);
      await service.create('B', sampleData);
      await service.toggleFavorite(a!.id);
      const result = await service.getFavorites();
      expect(result.data?.every(r => r.metadata?.favorite)).toBe(true);
      expect(result.data?.some(r => r.id === a!.id)).toBe(true);
    });
  });
});
