export default {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.{js,jsx,ts,tsx}',
    '**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/main.{jsx,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/*.d.ts',
    '!src/__mocks__/**',
    // Pure UI render files — covered by Playwright E2E, not unit tests
    '!src/pages/Home/**',
    '!src/pages/Dashboard/**',
    '!src/pages/MyResume.tsx',
    '!src/pages/ResumeBuilder.tsx',
    '!src/pages/index.ts',
    '!src/components/**',
    '!src/i18n/**',
    '!src/types/**',
    '!src/lib/**',
    '!src/styles/**',
    '!src/services/HttpStorageService.ts',
    '!src/services/SupabaseStorageService.ts',
    '!src/services/index.ts',
    '!src/services/IStorageService.ts',
    '!src/store/pages/**',
    '!src/utils/exportToPDF.ts',
    '!src/utils/exportToWord.ts',
    // Files with import.meta.env or complex runtime integration — tested via E2E
    '!src/services/ServiceFactory.ts',
    '!src/context/**',
    '!src/hooks/**',
    '!src/data/**'
  ],
  coverageThreshold: {
    global: {
      branches: 60,   // Error-handling branches in services are hard to trigger without fake failures
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@sentry/react$': '<rootDir>/src/__mocks__/sentryMock.js',
    '^@sentry/vite-plugin$': '<rootDir>/src/__mocks__/sentryMock.js',
    '^@supabase/supabase-js$': '<rootDir>/src/__mocks__/supabaseMock.js'
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './babel.config.json' }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/e2e/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/']
};
