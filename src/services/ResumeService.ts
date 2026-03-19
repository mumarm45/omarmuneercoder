/**
 * Resume Service
 * 
 * Business logic layer for resume operations.
 * Uses IStorageService for persistence, making it easy to swap storage implementations.
 */

import { IStorageService, StorageResult } from './IStorageService';
import { ResumeData } from '../types';
import { logger } from '../utils/errorHandling';

export interface Resume {
  id: string;
  name: string;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
  metadata?: ResumeMetadata;
}

export interface ResumeMetadata {
  tags?: string[];
  favorite?: boolean;
  version?: number;
  template?: string;
  completenessScore?: number;
  language?: string;   // e.g. 'en', 'ar', 'fr'
  parentId?: string;   // ID of the root language version; absent on root
}

export interface ResumeListItem {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  metadata?: ResumeMetadata;
}

export interface ResumeServiceResult<T> extends StorageResult<T> {
  data?: T;
}

const RESUME_PREFIX = 'resume';
const RESUME_LIST_KEY = 'resume-list';

export class ResumeService {
  constructor(private storage: IStorageService) {
    logger.debug('ResumeService initialized');
  }

  /**
   * Generate unique resume ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Get storage key for a resume
   */
  private getResumeKey(id: string): string {
    return `${RESUME_PREFIX}:${id}`;
  }

  /**
   * Calculate resume completeness score (0-100)
   */
  private calculateCompletenessScore(data: ResumeData): number {
    let score = 0;
    const weights = {
      personalInfo: 20,
      summary: 15,
      experience: 30,
      education: 20,
      skills: 15,
    };

    // Personal Info
    const personalFields = Object.values(data.personalInfo).filter(Boolean).length;
    score += (personalFields / Object.keys(data.personalInfo).length) * weights.personalInfo;

    // Summary
    if (data.summary && data.summary.length > 50) {
      score += weights.summary;
    } else if (data.summary) {
      score += (data.summary.length / 50) * weights.summary;
    }

    // Experience
    if (data.experience.length > 0) {
      const avgCompleteness = data.experience.reduce((sum, exp) => {
        const fields = [exp.title, exp.company, exp.startDate, exp.description].filter(Boolean).length;
        return sum + (fields / 4);
      }, 0) / data.experience.length;
      score += avgCompleteness * weights.experience;
    }

    // Education
    if (data.education.length > 0) {
      score += weights.education;
    }

    // Skills
    if (data.skills.length >= 5) {
      score += weights.skills;
    } else {
      score += (data.skills.length / 5) * weights.skills;
    }

    return Math.round(score);
  }

  /**
   * Get list of all resumes
   */
  private async getResumeList(): Promise<ResumeListItem[]> {
    const result = await this.storage.get<ResumeListItem[]>(RESUME_LIST_KEY);
    return result.success && result.data ? result.data : [];
  }

  /**
   * Update resume list
   */
  private async updateResumeList(list: ResumeListItem[]): Promise<void> {
    await this.storage.save(RESUME_LIST_KEY, list);
  }

  /**
   * Create a new resume
   */
  async create(name: string, data: ResumeData, metadata?: Partial<ResumeMetadata>): Promise<ResumeServiceResult<Resume>> {
    try {
      logger.info('Creating new resume', { name });

      const id = this.generateId();
      const now = new Date().toISOString();
      const completenessScore = this.calculateCompletenessScore(data);

      const resume: Resume = {
        id,
        name,
        data,
        createdAt: now,
        updatedAt: now,
        metadata: {
          ...metadata,
          completenessScore,
          version: 1,
        },
      };

      // Save resume
      const saveResult = await this.storage.save(this.getResumeKey(id), resume);
      if (!saveResult.success) {
        return saveResult;
      }

      // Update resume list
      const list = await this.getResumeList();
      list.push({
        id: resume.id,
        name: resume.name,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
        metadata: resume.metadata,
      });
      await this.updateResumeList(list);

      logger.info('Resume created successfully', { id, name });
      return {
        success: true,
        data: resume,
        message: 'Resume created successfully',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to create resume', { name, error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to create resume: ${errorMessage}`,
      };
    }
  }

  /**
   * Get a resume by ID
   */
  async get(id: string): Promise<ResumeServiceResult<Resume>> {
    try {
      logger.debug('Getting resume', { id });

      const result = await this.storage.get<Resume>(this.getResumeKey(id));
      
      if (!result.success) {
        return {
          success: false,
          message: `Resume not found: ${id}`,
        };
      }

      logger.debug('Resume retrieved', { id });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to get resume', { id, error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to get resume: ${errorMessage}`,
      };
    }
  }

  /**
   * Update an existing resume
   */
  async update(id: string, data: Partial<Resume>): Promise<ResumeServiceResult<Resume>> {
    try {
      logger.info('Updating resume', { id });

      // Get existing resume
      const existingResult = await this.get(id);
      if (!existingResult.success || !existingResult.data) {
        return {
          success: false,
          message: `Resume not found: ${id}`,
        };
      }

      const existing = existingResult.data;
      const now = new Date().toISOString();

      // Calculate new completeness score if data is being updated
      let completenessScore = existing.metadata?.completenessScore;
      if (data.data) {
        completenessScore = this.calculateCompletenessScore(data.data);
      }

      // Update resume
      const updated: Resume = {
        ...existing,
        ...data,
        id, // Ensure ID doesn't change
        updatedAt: now,
        metadata: {
          ...existing.metadata,
          ...data.metadata,
          completenessScore,
          version: (existing.metadata?.version || 1) + 1,
        },
      };

      // Save updated resume
      const saveResult = await this.storage.save(this.getResumeKey(id), updated);
      if (!saveResult.success) {
        return saveResult;
      }

      // Update resume list
      const list = await this.getResumeList();
      const index = list.findIndex(item => item.id === id);
      if (index !== -1) {
        list[index] = {
          id: updated.id,
          name: updated.name,
          createdAt: updated.createdAt,
          updatedAt: updated.updatedAt,
          metadata: updated.metadata,
        };
        await this.updateResumeList(list);
      }

      logger.info('Resume updated successfully', { id });
      return {
        success: true,
        data: updated,
        message: 'Resume updated successfully',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to update resume', { id, error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to update resume: ${errorMessage}`,
      };
    }
  }

  /**
   * Delete a resume
   */
  async delete(id: string): Promise<ResumeServiceResult<void>> {
    try {
      logger.info('Deleting resume', { id });

      // Delete resume
      const deleteResult = await this.storage.delete(this.getResumeKey(id));
      if (!deleteResult.success) {
        return deleteResult;
      }

      // Update resume list
      const list = await this.getResumeList();
      const filtered = list.filter(item => item.id !== id);
      await this.updateResumeList(filtered);

      logger.info('Resume deleted successfully', { id });
      return {
        success: true,
        message: 'Resume deleted successfully',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to delete resume', { id, error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to delete resume: ${errorMessage}`,
      };
    }
  }

  /**
   * List all resumes
   */
  async list(): Promise<ResumeServiceResult<ResumeListItem[]>> {
    try {
      logger.debug('Listing all resumes');

      const list = await this.getResumeList();
      
      // Sort by updatedAt (most recent first)
      list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      logger.debug('Resumes listed', { count: list.length });
      return {
        success: true,
        data: list,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to list resumes', { error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to list resumes: ${errorMessage}`,
      };
    }
  }

  /**
   * Duplicate a resume
   */
  async duplicate(id: string, newName?: string): Promise<ResumeServiceResult<Resume>> {
    try {
      logger.info('Duplicating resume', { id, newName });

      // Get existing resume
      const existingResult = await this.get(id);
      if (!existingResult.success || !existingResult.data) {
        return {
          success: false,
          message: `Resume not found: ${id}`,
        };
      }

      const existing = existingResult.data;
      const name = newName || `${existing.name} (Copy)`;

      // Create new resume with same data
      return await this.create(name, existing.data, existing.metadata);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to duplicate resume', { id, error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to duplicate resume: ${errorMessage}`,
      };
    }
  }

  /**
   * Search resumes by name or tags
   */
  async search(query: string): Promise<ResumeServiceResult<ResumeListItem[]>> {
    try {
      logger.debug('Searching resumes', { query });

      const listResult = await this.list();
      if (!listResult.success || !listResult.data) {
        return listResult;
      }

      const lowercaseQuery = query.toLowerCase();
      const filtered = listResult.data.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(lowercaseQuery);
        const tagsMatch = item.metadata?.tags?.some(tag => 
          tag.toLowerCase().includes(lowercaseQuery)
        );
        return nameMatch || tagsMatch;
      });

      logger.debug('Search completed', { query, results: filtered.length });
      return {
        success: true,
        data: filtered,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to search resumes', { query, error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to search resumes: ${errorMessage}`,
      };
    }
  }

  /**
   * Get favorite resumes
   */
  async getFavorites(): Promise<ResumeServiceResult<ResumeListItem[]>> {
    try {
      logger.debug('Getting favorite resumes');

      const listResult = await this.list();
      if (!listResult.success || !listResult.data) {
        return listResult;
      }

      const favorites = listResult.data.filter(item => item.metadata?.favorite);

      logger.debug('Favorites retrieved', { count: favorites.length });
      return {
        success: true,
        data: favorites,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to get favorites', { error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to get favorites: ${errorMessage}`,
      };
    }
  }

  /**
   * Toggle favorite status
   */
  async toggleFavorite(id: string): Promise<ResumeServiceResult<Resume>> {
    try {
      const existingResult = await this.get(id);
      if (!existingResult.success || !existingResult.data) {
        return {
          success: false,
          message: `Resume not found: ${id}`,
        };
      }

      const existing = existingResult.data;
      const favorite = !existing.metadata?.favorite;

      return await this.update(id, {
        metadata: {
          ...existing.metadata,
          favorite,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to toggle favorite', { id, error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to toggle favorite: ${errorMessage}`,
      };
    }
  }
}
