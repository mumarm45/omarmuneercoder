import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ResumeData } from '../types';

// Types
interface Resume {
  id: number;
  name: string;
  updatedAt: Date;
  data?: ResumeData;
}

interface SaveResumeInput {
  name: string;
  data: ResumeData;
}

interface UpdateResumeInput {
  id: number;
  data: Partial<ResumeData>;
}

// Mock API functions (replace with real API calls)
const resumeAPI = {
  // Fetch all resumes
  fetchResumes: async (): Promise<Resume[]> => {
    // Replace with actual API call
    // const response = await fetch('/api/resumes');
    // return response.json();
    
    // Mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Software Engineer Resume', updatedAt: new Date() },
          { id: 2, name: 'Product Manager Resume', updatedAt: new Date() },
        ]);
      }, 500);
    });
  },

  // Fetch single resume
  fetchResume: async (id: number): Promise<Resume> => {
    // Replace with actual API call
    // const response = await fetch(`/api/resumes/${id}`);
    // return response.json();
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: 'Sample Resume',
          updatedAt: new Date(),
          data: {
            personalInfo: {
              name: 'John Doe',
              title: 'Software Engineer',
              email: '',
              phone: '',
              location: '',
              linkedin: '',
              portfolio: '',
            },
            summary: '',
            experience: [],
            education: [],
            skills: [],
          },
        });
      }, 500);
    });
  },

  // Save resume
  saveResume: async (resumeData: SaveResumeInput): Promise<Resume> => {
    // Replace with actual API call
    // const response = await fetch('/api/resumes', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(resumeData),
    // });
    // return response.json();
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          id: Date.now(), 
          updatedAt: new Date(),
          ...resumeData 
        });
      }, 500);
    });
  },

  // Update resume
  updateResume: async ({ id, data }: UpdateResumeInput): Promise<Resume> => {
    // Replace with actual API call
    // const response = await fetch(`/api/resumes/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // return response.json();
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          id, 
          name: 'Updated Resume',
          updatedAt: new Date(),
          data: data as ResumeData
        });
      }, 500);
    });
  },

  // Delete resume
  deleteResume: async (id: number): Promise<{ success: boolean }> => {
    // Replace with actual API call
    // await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
};

// Query Keys
export const resumeKeys = {
  all: ['resumes'] as const,
  lists: () => [...resumeKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...resumeKeys.lists(), { filters }] as const,
  details: () => [...resumeKeys.all, 'detail'] as const,
  detail: (id: number) => [...resumeKeys.details(), id] as const,
};

// Hooks

/**
 * Fetch all resumes
 */
export const useResumes = (options?: Omit<UseQueryOptions<Resume[]>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: resumeKeys.lists(),
    queryFn: resumeAPI.fetchResumes,
    ...options,
  });
};

/**
 * Fetch single resume
 */
export const useResume = (
  id: number | undefined,
  options?: Omit<UseQueryOptions<Resume>, 'queryKey' | 'queryFn' | 'enabled'>
) => {
  return useQuery({
    queryKey: resumeKeys.detail(id || 0),
    queryFn: () => resumeAPI.fetchResume(id!),
    enabled: !!id,
    ...options,
  });
};

/**
 * Save new resume
 */
export const useSaveResume = (
  options?: Omit<UseMutationOptions<Resume, Error, SaveResumeInput>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeAPI.saveResume,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch resumes list
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

/**
 * Update existing resume
 */
export const useUpdateResume = (
  options?: Omit<UseMutationOptions<Resume, Error, UpdateResumeInput>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeAPI.updateResume,
    onSuccess: (data, variables, context) => {
      // Update cache for specific resume
      queryClient.setQueryData(resumeKeys.detail(data.id), data);
      // Invalidate list to show updated data
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

/**
 * Delete resume
 */
export const useDeleteResume = (
  options?: Omit<UseMutationOptions<{ success: boolean }, Error, number>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeAPI.deleteResume,
    onSuccess: (data, deletedId, context) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: resumeKeys.detail(deletedId) });
      // Invalidate list
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
      options?.onSuccess?.(data, deletedId, context);
    },
    ...options,
  });
};

/**
 * Example usage in component:
 * 
 * const { data: resumes, isLoading, error } = useResumes();
 * const { mutate: saveResume, isPending } = useSaveResume();
 * 
 * saveResume(resumeData, {
 *   onSuccess: () => console.log('Saved!'),
 *   onError: (error) => console.error(error),
 * });
 */
