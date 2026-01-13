/**
 * LocalStorage Implementation of Storage Service
 * 
 * Production-ready implementation using browser localStorage.
 * Includes error handling, data validation, and size management.
 */

import { 
  IStorageService, 
  StorageResult, 
  StorageConfig, 
  StorageStats 
} from './IStorageService';
import { logger } from '../utils/errorHandling';

const DEFAULT_CONFIG: StorageConfig = {
  prefix: 'resume-app',
  version: '1.0',
};

export class LocalStorageService implements IStorageService {
  private config: StorageConfig;

  constructor(config: Partial<StorageConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.validateStorageAvailability();
  }

  /**
   * Check if localStorage is available
   */
  private validateStorageAvailability(): void {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
    } catch (error) {
      logger.error('localStorage is not available', error);
      throw new Error('localStorage is not available in this browser');
    }
  }

  /**
   * Generate prefixed key
   */
  private getPrefixedKey(key: string): string {
    return `${this.config.prefix}:${this.config.version}:${key}`;
  }

  /**
   * Remove prefix from key
   */
  private removePrefixFromKey(prefixedKey: string): string {
    const prefix = `${this.config.prefix}:${this.config.version}:`;
    return prefixedKey.startsWith(prefix) 
      ? prefixedKey.substring(prefix.length) 
      : prefixedKey;
  }

  /**
   * Safely serialize data to JSON
   */
  private serialize<T>(data: T): string {
    try {
      return JSON.stringify({
        data,
        timestamp: Date.now(),
        version: this.config.version,
      });
    } catch (error) {
      throw new Error(`Failed to serialize data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Safely deserialize JSON data
   */
  private deserialize<T>(json: string): T {
    try {
      const parsed = JSON.parse(json);
      return parsed.data as T;
    } catch (error) {
      throw new Error(`Failed to deserialize data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Calculate size of stored data in bytes
   */
  private calculateSize(value: string): number {
    return new Blob([value]).size;
  }

  async save<T>(key: string, data: T): Promise<StorageResult<T>> {
    try {
      logger.debug('Saving to localStorage', { key });
      
      const prefixedKey = this.getPrefixedKey(key);
      const serialized = this.serialize(data);

      // Check quota before saving
      const size = this.calculateSize(serialized);
      if (size > 5 * 1024 * 1024) { // 5MB limit
        logger.warn('Data size exceeds recommended limit', { key, size });
      }

      localStorage.setItem(prefixedKey, serialized);

      logger.info('Data saved successfully', { key });
      return {
        success: true,
        data,
        message: 'Data saved successfully',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to save data', { key, error: errorMessage });

      // Check for quota exceeded error
      if (errorMessage.includes('quota') || errorMessage.includes('QuotaExceededError')) {
        return {
          success: false,
          error: error as Error,
          message: 'Storage quota exceeded. Please free up space or clear old data.',
        };
      }

      return {
        success: false,
        error: error as Error,
        message: `Failed to save data: ${errorMessage}`,
      };
    }
  }

  async get<T>(key: string): Promise<StorageResult<T>> {
    try {
      logger.debug('Retrieving from localStorage', { key });
      
      const prefixedKey = this.getPrefixedKey(key);
      const serialized = localStorage.getItem(prefixedKey);

      if (serialized === null) {
        logger.debug('Key not found', { key });
        return {
          success: false,
          message: `Key "${key}" not found`,
        };
      }

      const data = this.deserialize<T>(serialized);

      logger.debug('Data retrieved successfully', { key });
      return {
        success: true,
        data,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to retrieve data', { key, error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to retrieve data: ${errorMessage}`,
      };
    }
  }

  async delete(key: string): Promise<StorageResult<void>> {
    try {
      logger.debug('Deleting from localStorage', { key });
      
      const prefixedKey = this.getPrefixedKey(key);
      localStorage.removeItem(prefixedKey);

      logger.info('Data deleted successfully', { key });
      return {
        success: true,
        message: 'Data deleted successfully',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to delete data', { key, error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to delete data: ${errorMessage}`,
      };
    }
  }

  async exists(key: string): Promise<StorageResult<boolean>> {
    try {
      const prefixedKey = this.getPrefixedKey(key);
      const exists = localStorage.getItem(prefixedKey) !== null;

      return {
        success: true,
        data: exists,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to check key existence', { key, error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to check key existence: ${errorMessage}`,
      };
    }
  }

  async list(prefix?: string): Promise<StorageResult<string[]>> {
    try {
      logger.debug('Listing keys', { prefix });
      
      const fullPrefix = prefix 
        ? this.getPrefixedKey(prefix)
        : `${this.config.prefix}:${this.config.version}:`;

      const keys: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(fullPrefix)) {
          keys.push(this.removePrefixFromKey(key));
        }
      }

      logger.debug('Keys listed successfully', { count: keys.length });
      return {
        success: true,
        data: keys,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to list keys', { error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to list keys: ${errorMessage}`,
      };
    }
  }

  async clear(prefix?: string): Promise<StorageResult<void>> {
    try {
      logger.debug('Clearing storage', { prefix });
      
      if (prefix) {
        // Clear only keys with specific prefix
        const result = await this.list(prefix);
        if (result.success && result.data) {
          for (const key of result.data) {
            await this.delete(key);
          }
        }
      } else {
        // Clear all keys with app prefix
        const result = await this.list();
        if (result.success && result.data) {
          for (const key of result.data) {
            await this.delete(key);
          }
        }
      }

      logger.info('Storage cleared successfully', { prefix });
      return {
        success: true,
        message: 'Storage cleared successfully',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to clear storage', { error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to clear storage: ${errorMessage}`,
      };
    }
  }

  async getStats(): Promise<StorageResult<StorageStats>> {
    try {
      const result = await this.list();
      
      if (!result.success || !result.data) {
        return {
          success: false,
          message: 'Failed to get storage statistics',
        };
      }

      let totalSize = 0;
      for (const key of result.data) {
        const prefixedKey = this.getPrefixedKey(key);
        const item = localStorage.getItem(prefixedKey);
        if (item) {
          totalSize += this.calculateSize(item);
        }
      }

      const stats: StorageStats = {
        totalKeys: result.data.length,
        totalSize,
      };

      logger.debug('Storage stats retrieved', stats);
      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to get storage stats', { error: errorMessage });
      
      return {
        success: false,
        error: error as Error,
        message: `Failed to get storage stats: ${errorMessage}`,
      };
    }
  }
}
