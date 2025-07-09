#!/usr/bin/env node
/**
 * Quick Deployment Fix
 * 
 * This script fixes the deployment issue where static files are expected in 'dist/'
 * but the build process outputs them to 'dist/public/'.
 * 
 * Run this script after building to fix the deployment structure:
 * npm run build && node fix-deployment.js
 */

import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'dist', 'public');
const distDir = path.join(process.cwd(), 'dist');

console.log('🔧 Fixing deployment structure...');

// Check if dist/public exists
if (!fs.existsSync(publicDir)) {
  console.log('❌ dist/public directory not found. Run npm run build first.');
  process.exit(1);
}

// Get all files from dist/public
const files = fs.readdirSync(publicDir);

console.log('📁 Moving files from dist/public to dist/...');

files.forEach(file => {
  const srcPath = path.join(publicDir, file);
  const destPath = path.join(distDir, file);
  
  // Skip if file already exists in dist/ (like server index.js)
  if (fs.existsSync(destPath)) {
    console.log(`⏭️  Skipping ${file} (already exists)`);
    return;
  }
  
  // Copy file or directory
  try {
    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
      console.log(`📂 Copied directory: ${file}`);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`📄 Copied file: ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error copying ${file}:`, error.message);
  }
});

console.log('✅ Deployment structure fixed!');
console.log('📄 Files are now in dist/ for static deployment');

// Verify the fix
const distFiles = fs.readdirSync(distDir);
const hasIndex = distFiles.includes('index.html');
const hasAssets = distFiles.includes('assets');

console.log('\n📋 Verification:');
console.log(`   index.html in dist/: ${hasIndex ? '✅' : '❌'}`);
console.log(`   assets/ in dist/: ${hasAssets ? '✅' : '❌'}`);

if (hasIndex && hasAssets) {
  console.log('\n🎉 Ready for deployment!');
} else {
  console.log('\n⚠️  Deployment may fail - missing required files');
}