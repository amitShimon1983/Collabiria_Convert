import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: false,
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/__tests__/setup/jest.setup.ts'],
  testMatch: ['**/*.test.(ts|js)'],
  roots: ['./src/__tests__'],
  testTimeout: 60000,
};

export default config;
