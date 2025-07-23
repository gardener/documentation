import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export default defineConfig({
  test: {
    // Enable TypeScript support
    globals: true,
    environment: 'node',
    
    // Test file patterns
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    
    // Exclude patterns
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
    ],
    
    // Test timeout
    testTimeout: 10000,
    
    // Coverage configuration (optional)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}'
      ]
    }
  },
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      '@data': path.resolve(__dirname, '.vitepress/data'),
      '@components': path.resolve(__dirname, '.vitepress/theme/components'),
      '@utils': path.resolve(__dirname, '.vitepress/theme/utils')
    }
  },
  
  // Enable TypeScript module resolution
  esbuild: {
    target: 'node14'
  }
})