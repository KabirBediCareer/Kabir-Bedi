#!/usr/bin/env node

/**
 * Quick Deployment Fix
 * 
 * This script quickly fixes the deployment structure by copying files from dist/public to dist.
 * Run this after the build completes to ensure files are in the correct location for deployment.
 */

import fs from 'fs';
import path from 'path';

console.log('🔧 Quick deployment fix starting...');

const publicPath = path.join(process.cwd(), 'dist', 'public');
const distPath = path.join(process.cwd(), 'dist');

try {
  // Check if dist/public exists
  if (!fs.existsSync(publicPath)) {
    console.log('⚠️  dist/public not found. Run npm run build first.');
    console.log('💡 The build process creates files in dist/public that need to be copied to dist/');
    process.exit(1);
  }

  // Ensure dist directory exists
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  // Copy all files from dist/public to dist
  const files = fs.readdirSync(publicPath);
  
  console.log(`📁 Found ${files.length} items to copy from dist/public to dist/`);
  
  for (const file of files) {
    const sourcePath = path.join(publicPath, file);
    const destPath = path.join(distPath, file);
    
    // Skip if file already exists in dist root (like index.js from server build)
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  Skipping ${file} - already exists in dist/`);
      continue;
    }
    
    // Copy file/directory
    if (fs.statSync(sourcePath).isDirectory()) {
      fs.cpSync(sourcePath, destPath, { recursive: true });
      console.log(`📂 Copied directory: ${file}`);
    } else {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`📄 Copied file: ${file}`);
    }
  }
  
  console.log('✅ Deployment fix completed!');
  console.log('🚀 Files are now in the correct location for deployment');
  console.log('');
  console.log('📋 Current structure:');
  console.log('   dist/');
  console.log('   ├── index.html      (for deployment)');
  console.log('   ├── assets/         (for deployment)');
  console.log('   ├── index.js        (server file)');
  console.log('   └── public/         (original build output)');
  
} catch (error) {
  console.error('❌ Error during deployment fix:', error.message);
  process.exit(1);
}