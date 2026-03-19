import { supabase } from '../lib/supabase';
import {
  IStorageService,
  StorageResult,
  StorageConfig,
  StorageStats,
} from './IStorageService';
import { logger } from '../utils/errorHandling';

export class SupabaseStorageService implements IStorageService {
  private config: StorageConfig;

  constructor(config: Partial<StorageConfig> = {}) {
    this.config = {
      prefix: config.prefix || 'resume-app',
      version: config.version || '1.0',
    };
  }

  private prefixedKey(key: string): string {
    return `${this.config.prefix}:${key}`;
  }

  private stripPrefix(key: string): string {
    const prefix = `${this.config.prefix}:`;
    return key.startsWith(prefix) ? key.slice(prefix.length) : key;
  }

  private async currentUserId(): Promise<string | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  }

  async save<T>(key: string, data: T): Promise<StorageResult<T>> {
    try {
      const userId = await this.currentUserId();
      if (!userId) return { success: false, message: 'Not authenticated' };

      const { error } = await supabase.from('storage_items').upsert(
        {
          user_id: userId,
          key: this.prefixedKey(key),
          data: data as object,
          version: this.config.version,
        },
        { onConflict: 'user_id,key' }
      );

      if (error) throw error;

      return { success: true, data, message: 'Data saved successfully' };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Supabase save failed', { key, error: msg });
      return { success: false, error: error as Error, message: `Failed to save: ${msg}` };
    }
  }

  async get<T>(key: string): Promise<StorageResult<T>> {
    try {
      const userId = await this.currentUserId();
      if (!userId) return { success: false, message: 'Not authenticated' };

      const { data, error } = await supabase
        .from('storage_items')
        .select('data')
        .eq('user_id', userId)
        .eq('key', this.prefixedKey(key))
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return { success: false, message: `Key "${key}" not found` };
        }
        throw error;
      }

      return { success: true, data: data.data as T };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Supabase get failed', { key, error: msg });
      return { success: false, error: error as Error, message: `Failed to get: ${msg}` };
    }
  }

  async delete(key: string): Promise<StorageResult<void>> {
    try {
      const userId = await this.currentUserId();
      if (!userId) return { success: false, message: 'Not authenticated' };

      const { error } = await supabase
        .from('storage_items')
        .delete()
        .eq('user_id', userId)
        .eq('key', this.prefixedKey(key));

      if (error) throw error;

      return { success: true, message: 'Data deleted successfully' };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Supabase delete failed', { key, error: msg });
      return { success: false, error: error as Error, message: `Failed to delete: ${msg}` };
    }
  }

  async exists(key: string): Promise<StorageResult<boolean>> {
    try {
      const userId = await this.currentUserId();
      if (!userId) return { success: false, message: 'Not authenticated' };

      const { count, error } = await supabase
        .from('storage_items')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('key', this.prefixedKey(key));

      if (error) throw error;

      return { success: true, data: (count ?? 0) > 0 };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Supabase exists check failed', { key, error: msg });
      return { success: false, error: error as Error, message: `Failed to check: ${msg}` };
    }
  }

  async list(prefix?: string): Promise<StorageResult<string[]>> {
    try {
      const userId = await this.currentUserId();
      if (!userId) return { success: false, message: 'Not authenticated' };

      const keyPrefix = prefix
        ? `${this.config.prefix}:${prefix}`
        : `${this.config.prefix}:`;

      const { data, error } = await supabase
        .from('storage_items')
        .select('key')
        .eq('user_id', userId)
        .like('key', `${keyPrefix}%`);

      if (error) throw error;

      const keys = (data || []).map((row) => this.stripPrefix(row.key));
      return { success: true, data: keys };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Supabase list failed', { error: msg });
      return { success: false, error: error as Error, message: `Failed to list: ${msg}` };
    }
  }

  async clear(prefix?: string): Promise<StorageResult<void>> {
    try {
      const userId = await this.currentUserId();
      if (!userId) return { success: false, message: 'Not authenticated' };

      const keyPrefix = prefix
        ? `${this.config.prefix}:${prefix}`
        : `${this.config.prefix}:`;

      const { error } = await supabase
        .from('storage_items')
        .delete()
        .eq('user_id', userId)
        .like('key', `${keyPrefix}%`);

      if (error) throw error;

      return { success: true, message: 'Storage cleared successfully' };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Supabase clear failed', { error: msg });
      return { success: false, error: error as Error, message: `Failed to clear: ${msg}` };
    }
  }

  async getStats(): Promise<StorageResult<StorageStats>> {
    try {
      const userId = await this.currentUserId();
      if (!userId) return { success: false, message: 'Not authenticated' };

      const { count, error } = await supabase
        .from('storage_items')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (error) throw error;

      return {
        success: true,
        data: { totalKeys: count ?? 0, totalSize: 0 },
      };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Supabase getStats failed', { error: msg });
      return { success: false, error: error as Error, message: `Failed to get stats: ${msg}` };
    }
  }
}
