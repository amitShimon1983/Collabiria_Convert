import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./__tests__/setup/jest.setup.ts'],
  testMatch: ['**/*.test.(ts|js)'],
  roots: ['./__tests__'],
  testTimeout: 60000,
};

export default config;
