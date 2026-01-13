/**
 * Storage Service Interface
 * 
 * Provides abstraction for data persistence operations.
 * Can be implemented with localStorage, sessionStorage, HTTP API, or any other storage mechanism.
 */

export interface StorageConfig {
  prefix?: string;
  version?: string;
}

export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
  message?: string;
}

export interface IStorageService {
  /**
   * Save data to storage
   */
  save<T>(key: string, data: T): Promise<StorageResult<T>>;

  /**
   * Retrieve data from storage
   */
  get<T>(key: string): Promise<StorageResult<T>>;

  /**
   * Delete data from storage
   */
  delete(key: string): Promise<StorageResult<void>>;

  /**
   * Check if key exists in storage
   */
  exists(key: string): Promise<StorageResult<boolean>>;

  /**
   * List all keys in storage (with optional prefix filter)
   */
  list(prefix?: string): Promise<StorageResult<string[]>>;

  /**
   * Clear all data from storage (with optional prefix filter)
   */
  clear(prefix?: string): Promise<StorageResult<void>>;

  /**
   * Get storage statistics
   */
  getStats(): Promise<StorageResult<StorageStats>>;
}

export interface StorageStats {
  totalKeys: number;
  totalSize: number; // in bytes
  availableSpace?: number;
}
