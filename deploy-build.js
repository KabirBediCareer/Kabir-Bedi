#!/usr/bin/env node

/**
 * Deployment Build Script
 * 
 * This script solves the deployment issue where static files need to be in 'dist/'
 * but the build process outputs them to 'dist/public/'.
 * 
 * Usage: node deploy-build.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting deployment build...');

try {
  // Run the standard build process
  console.log('📦 Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Move files from dist/public to dist for deployment
  const publicPath = path.join(process.cwd(), 'dist', 'public');
  const distPath = path.join(process.cwd(), 'dist');
  
  if (fs.existsSync(publicPath)) {
    console.log('📁 Restructuring files for deployment...');
    
    const files = fs.readdirSync(publicPath);
    
    for (const file of files) {
      const sourcePath = path.join(publicPath, file);
      const destPath = path.join(distPath, file);
      
      // Skip if file already exists (like server index.js)
      if (fs.existsSync(destPath)) continue;
      
      // Copy file or directory
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    }
    
    console.log('✅ Deployment build completed successfully!');
    console.log('📄 Files are now in dist/ for deployment');
    
  } else {
    console.error('❌ Build failed - dist/public not found');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Deployment build failed:', error.message);
  process.exit(1);
}