# Services Layer Documentation

## Overview

The services layer provides a clean abstraction for data persistence, making it easy to switch between localStorage (development) and HTTP API (production) without changing business logic.

## Architecture

```
┌─────────────────────────────────────────────┐
│          Application Layer                   │
│  (React Components, Hooks, Zustand)         │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│         Business Logic Layer                 │
│         (ResumeService)                      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│         Storage Abstraction Layer            │
│         (IStorageService Interface)          │
└────────────────┬────────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌──────────────┐  ┌──────────────┐
│ LocalStorage │  │  HTTP API    │
│   Service    │  │   Service    │
└──────────────┘  └──────────────┘
```

## Quick Start

### 1. Basic Usage (localStorage)

```typescript
import { getServices } from '@/services';

// Get service instances
const { resumeService } = getServices();

// Create a new resume
const result = await resumeService.create('My Resume', resumeData);

if (result.success) {
  console.log('Resume created:', result.data);
} else {
  console.error('Error:', result.message);
}
```

### 2. Using with React Hook

```typescript
// hooks/useResumeService.ts
import { useMemo } from 'react';
import { getServices } from '@/services';

export function useResumeService() {
  const services = useMemo(() => getServices(), []);
  
  return services.resumeService;
}

// In your component
function MyComponent() {
  const resumeService = useResumeService();
  
  const handleCreateResume = async () => {
    const result = await resumeService.create('New Resume', data);
    // Handle result...
  };
}
```

### 3. Configuration for Production (HTTP API)

```typescript
// main.tsx or App.tsx
import { ServiceFactory } from '@/services';

// Initialize with HTTP API
ServiceFactory.getInstance({
  storageType: 'http',
  apiBaseUrl: 'https://api.yourapp.com',
  authToken: 'your-auth-token',
});

// Or use environment-based config
import { getServices, getEnvConfig } from '@/services';

const services = getServices(getEnvConfig());
```

### 4. Environment Variables

Create a `.env` file:

```env
# Development (uses localStorage)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_STORAGE_PREFIX=resume-app
VITE_STORAGE_VERSION=1.0

# Production (uses HTTP)
# VITE_API_BASE_URL=https://api.yourapp.com
```

## API Reference

### ResumeService

#### `create(name: string, data: ResumeData, metadata?: Partial<ResumeMetadata>)`
Create a new resume.

```typescript
const result = await resumeService.create('Software Engineer Resume', {
  personalInfo: { /* ... */ },
  summary: 'Experienced developer...',
  experience: [/* ... */],
  education: [/* ... */],
  skills: ['JavaScript', 'React'],
});
```

#### `get(id: string)`
Get a resume by ID.

```typescript
const result = await resumeService.get('resume-123');
if (result.success) {
  console.log(result.data);
}
```

#### `update(id: string, data: Partial<Resume>)`
Update an existing resume.

```typescript
await resumeService.update('resume-123', {
  name: 'Updated Resume Name',
  data: { /* updated resume data */ },
});
```

#### `delete(id: string)`
Delete a resume.

```typescript
await resumeService.delete('resume-123');
```

#### `list()`
List all resumes.

```typescript
const result = await resumeService.list();
if (result.success) {
  result.data.forEach(resume => {
    console.log(resume.name, resume.updatedAt);
  });
}
```

#### `duplicate(id: string, newName?: string)`
Duplicate a resume.

```typescript
await resumeService.duplicate('resume-123', 'Copy of My Resume');
```

#### `search(query: string)`
Search resumes by name or tags.

```typescript
const result = await resumeService.search('software');
```

#### `getFavorites()`
Get favorite resumes.

```typescript
const result = await resumeService.getFavorites();
```

#### `toggleFavorite(id: string)`
Toggle favorite status.

```typescript
await resumeService.toggleFavorite('resume-123');
```

## Integration with Zustand

You can integrate the service layer with your existing Zustand store:

```typescript
// store/resumeStore.ts
import { create } from 'zustand';
import { getServices } from '@/services';
import type { Resume } from '@/services';

const { resumeService } = getServices();

interface ResumeStore {
  resumes: Resume[];
  currentResume?: Resume;
  loading: boolean;
  error?: string;
  
  // Actions
  loadResumes: () => Promise<void>;
  loadResume: (id: string) => Promise<void>;
  createResume: (name: string, data: ResumeData) => Promise<void>;
  updateResume: (id: string, data: Partial<Resume>) => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumes: [],
  loading: false,

  loadResumes: async () => {
    set({ loading: true, error: undefined });
    try {
      const result = await resumeService.list();
      if (result.success && result.data) {
        set({ resumes: result.data });
      } else {
        set({ error: result.message });
      }
    } catch (error) {
      set({ error: 'Failed to load resumes' });
    } finally {
      set({ loading: false });
    }
  },

  loadResume: async (id: string) => {
    set({ loading: true, error: undefined });
    try {
      const result = await resumeService.get(id);
      if (result.success && result.data) {
        set({ currentResume: result.data });
      } else {
        set({ error: result.message });
      }
    } catch (error) {
      set({ error: 'Failed to load resume' });
    } finally {
      set({ loading: false });
    }
  },

  createResume: async (name: string, data: ResumeData) => {
    set({ loading: true, error: undefined });
    try {
      const result = await resumeService.create(name, data);
      if (result.success && result.data) {
        set((state) => ({
          resumes: [result.data, ...state.resumes],
          currentResume: result.data,
        }));
      } else {
        set({ error: result.message });
      }
    } catch (error) {
      set({ error: 'Failed to create resume' });
    } finally {
      set({ loading: false });
    }
  },

  updateResume: async (id: string, data: Partial<Resume>) => {
    set({ loading: true, error: undefined });
    try {
      const result = await resumeService.update(id, data);
      if (result.success && result.data) {
        set((state) => ({
          resumes: state.resumes.map((r) => 
            r.id === id ? result.data : r
          ),
          currentResume: state.currentResume?.id === id 
            ? result.data 
            : state.currentResume,
        }));
      } else {
        set({ error: result.message });
      }
    } catch (error) {
      set({ error: 'Failed to update resume' });
    } finally {
      set({ loading: false });
    }
  },

  deleteResume: async (id: string) => {
    set({ loading: true, error: undefined });
    try {
      const result = await resumeService.delete(id);
      if (result.success) {
        set((state) => ({
          resumes: state.resumes.filter((r) => r.id !== id),
          currentResume: state.currentResume?.id === id 
            ? undefined 
            : state.currentResume,
        }));
      } else {
        set({ error: result.message });
      }
    } catch (error) {
      set({ error: 'Failed to delete resume' });
    } finally {
      set({ loading: false });
    }
  },
}));
```

## Switching from localStorage to HTTP

### Step 1: Update Environment Variables

```env
# Production .env
VITE_API_BASE_URL=https://api.yourapp.com/v1
```

### Step 2: Initialize with Environment Config

```typescript
// main.tsx
import { getEnvConfig, ServiceFactory } from '@/services';

// This will automatically use HTTP if VITE_API_BASE_URL is set and MODE=production
ServiceFactory.getInstance(getEnvConfig());
```

### Step 3: Backend API Requirements

Your backend needs to implement these endpoints:

```
PUT    /api/storage/:key          - Save data
GET    /api/storage/:key          - Get data
DELETE /api/storage/:key          - Delete data
GET    /api/storage/:key/exists   - Check if key exists
GET    /api/storage?prefix=...    - List keys
DELETE /api/storage               - Clear storage
GET    /api/storage/stats         - Get storage statistics
```

Example Express.js implementation:

```javascript
// Backend example (Express.js)
app.put('/api/storage/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { data, metadata } = req.body;
    
    // Save to database
    await db.storage.save(key, data, metadata);
    
    res.json({
      success: true,
      data,
      message: 'Data saved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

## Features

### ✅ Completed

- **Service Abstraction Layer**: Clean interface for storage operations
- **LocalStorage Implementation**: Production-ready with error handling
- **HTTP Service Placeholder**: Ready for backend integration
- **Resume CRUD Operations**: Create, Read, Update, Delete
- **Resume Management**: List, Search, Duplicate, Favorites
- **Completeness Scoring**: Automatic calculation of resume quality
- **Metadata Support**: Tags, favorites, versions
- **Error Handling**: Comprehensive error messages and logging

### 🎯 Best Practices

1. **Always handle errors**: Check `result.success` before using data
2. **Use TypeScript**: Full type safety throughout
3. **Async/Await**: All operations are asynchronous
4. **Logging**: Built-in logging for debugging
5. **Validation**: Data validation at service level
6. **Immutability**: Never mutate data directly

### 📝 Examples

See the `/examples` directory for:
- Complete React component examples
- Custom hooks
- Error handling patterns
- Migration guides

## Testing

```typescript
import { ServiceFactory } from '@/services';

describe('ResumeService', () => {
  beforeEach(() => {
    ServiceFactory.reset();
  });

  it('should create a resume', async () => {
    const factory = ServiceFactory.create();
    const resumeService = factory.getResumeService();
    
    const result = await resumeService.create('Test', mockData);
    expect(result.success).toBe(true);
  });
});
```

## Support

For issues or questions:
1. Check the examples directory
2. Review the inline documentation
3. Check the error messages (they're descriptive!)
4. File an issue on GitHub
