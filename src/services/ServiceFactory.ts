/**
 * Service Factory
 * 
 * Centralized factory for creating service instances.
 * Makes it easy to switch between different storage implementations.
 */

import { IStorageService } from './IStorageService';
import { LocalStorageService } from './LocalStorageService';
import { HttpStorageService } from './HttpStorageService';
import { ResumeService } from './ResumeService';
import { logger } from '../utils/errorHandling';

export type StorageType = 'localStorage' | 'http';

export interface ServiceConfig {
  storageType?: StorageType;
  apiBaseUrl?: string;
  authToken?: string;
  storagePrefix?: string;
  storageVersion?: string;
}

/**
 * Service Factory Class
 * 
 * Usage:
 * ```typescript
 * // Development (localStorage)
 * const services = ServiceFactory.create();
 * 
 * // Production (HTTP API)
 * const services = ServiceFactory.create({
 *   storageType: 'http',
 *   apiBaseUrl: 'https://api.example.com',
 *   authToken: 'your-token'
 * });
 * ```
 */
export class ServiceFactory {
  private static instance: ServiceFactory;
  private storageService?: IStorageService;
  private resumeService?: ResumeService;
  private config: ServiceConfig;

  private constructor(config: ServiceConfig = {}) {
    this.config = {
      storageType: 'localStorage',
      storagePrefix: 'resume-app',
      storageVersion: '1.0',
      ...config,
    };

    logger.info('ServiceFactory initialized', { 
      storageType: this.config.storageType 
    });
  }

  /**
   * Get or create singleton instance
   */
  static getInstance(config?: ServiceConfig): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory(config);
    } else if (config) {
      // Update config if provided
      ServiceFactory.instance.updateConfig(config);
    }
    return ServiceFactory.instance;
  }

  /**
   * Create new instance (useful for testing)
   */
  static create(config?: ServiceConfig): ServiceFactory {
    return new ServiceFactory(config);
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<ServiceConfig>): void {
    this.config = { ...this.config, ...config };
    
    // Clear cached services to force recreation with new config
    this.storageService = undefined;
    this.resumeService = undefined;

    logger.info('ServiceFactory config updated', { 
      storageType: this.config.storageType 
    });
  }

  /**
   * Get storage service instance
   */
  getStorageService(): IStorageService {
    if (!this.storageService) {
      this.storageService = this.createStorageService();
    }
    return this.storageService;
  }

  /**
   * Get resume service instance
   */
  getResumeService(): ResumeService {
    if (!this.resumeService) {
      const storage = this.getStorageService();
      this.resumeService = new ResumeService(storage);
    }
    return this.resumeService;
  }

  /**
   * Create storage service based on configuration
   */
  private createStorageService(): IStorageService {
    const { storageType, apiBaseUrl, authToken, storagePrefix, storageVersion } = this.config;

    logger.debug('Creating storage service', { storageType });

    switch (storageType) {
      case 'http':
        if (!apiBaseUrl) {
          logger.warn('HTTP storage selected but no API URL provided, falling back to localStorage');
          return new LocalStorageService({ 
            prefix: storagePrefix, 
            version: storageVersion 
          });
        }
        return new HttpStorageService(
          apiBaseUrl,
          { prefix: storagePrefix, version: storageVersion },
          authToken
        );

      case 'localStorage':
      default:
        return new LocalStorageService({ 
          prefix: storagePrefix, 
          version: storageVersion 
        });
    }
  }

  /**
   * Switch storage type at runtime
   */
  switchStorageType(storageType: StorageType, apiBaseUrl?: string, authToken?: string): void {
    logger.info('Switching storage type', { 
      from: this.config.storageType, 
      to: storageType 
    });

    this.updateConfig({ 
      storageType, 
      ...(apiBaseUrl && { apiBaseUrl }),
      ...(authToken && { authToken })
    });
  }

  /**
   * Reset factory (useful for testing)
   */
  static reset(): void {
    ServiceFactory.instance = null as unknown as ServiceFactory;
    logger.debug('ServiceFactory reset');
  }

  /**
   * Get current configuration
   */
  getConfig(): Readonly<ServiceConfig> {
    return { ...this.config };
  }
}

/**
 * Convenience function to get service instances
 * 
 * Usage:
 * ```typescript
 * const { resumeService, storageService } = getServices();
 * ```
 */
export function getServices(config?: ServiceConfig) {
  const factory = ServiceFactory.getInstance(config);
  
  return {
    storageService: factory.getStorageService(),
    resumeService: factory.getResumeService(),
    factory,
  };
}

/**
 * Environment-based configuration helper
 * 
 * Usage:
 * ```typescript
 * const services = getServices(getEnvConfig());
 * ```
 */
export function getEnvConfig(): ServiceConfig {
  const env = import.meta.env;

  // Check if we're in production and have API URL configured
  const isProd = env.MODE === 'production';
  const apiBaseUrl = env.VITE_API_BASE_URL as string | undefined;
  const useHttp = isProd && apiBaseUrl;

  return {
    storageType: useHttp ? 'http' : 'localStorage',
    apiBaseUrl: apiBaseUrl || '/api',
    storagePrefix: env.VITE_STORAGE_PREFIX as string || 'resume-app',
    storageVersion: env.VITE_STORAGE_VERSION as string || '1.0',
  };
}

// Export default instance for convenience
export default ServiceFactory;
