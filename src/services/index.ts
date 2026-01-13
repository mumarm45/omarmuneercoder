/**
 * Services Module
 * 
 * Central export point for all service-related functionality.
 */

// Interfaces
export type {
  IStorageService,
  StorageConfig,
  StorageResult,
  StorageStats,
} from './IStorageService';

export type {
  Resume,
  ResumeMetadata,
  ResumeListItem,
  ResumeServiceResult,
} from './ResumeService';

export type {
  StorageType,
  ServiceConfig,
} from './ServiceFactory';

// Implementations
export { LocalStorageService } from './LocalStorageService';
export { HttpStorageService } from './HttpStorageService';
export { ResumeService } from './ResumeService';

// Factory
export { 
  ServiceFactory, 
  getServices, 
  getEnvConfig 
} from './ServiceFactory';
