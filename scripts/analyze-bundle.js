#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Analyzing bundle size and performance...\n');

try {
  // Run bundle analyzer
  console.log('📊 Running bundle analyzer...');
  execSync('ANALYZE=true npm run build', { stdio: 'inherit' });
  
  console.log('\n✅ Bundle analysis complete!');
  console.log('📈 Check the browser window that opened to see your bundle breakdown.');
  console.log('💡 Look for:');
  console.log('   - Large vendor chunks');
  console.log('   - Duplicate dependencies');
  console.log('   - Unused code');
  console.log('   - Opportunities for code splitting');
  
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
} 