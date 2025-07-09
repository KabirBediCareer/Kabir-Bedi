#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  // Step 1: Run vite build
  console.log('Building frontend...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Step 2: Run esbuild for server
  console.log('Building backend...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  // Step 3: Copy contents from dist/public to dist for deployment
  console.log('Restructuring files for deployment...');
  const publicPath = path.join(process.cwd(), 'dist', 'public');
  const distPath = path.join(process.cwd(), 'dist');
  
  if (fs.existsSync(publicPath)) {
    // Read all files from dist/public
    const files = fs.readdirSync(publicPath);
    
    for (const file of files) {
      const sourcePath = path.join(publicPath, file);
      const destPath = path.join(distPath, file);
      
      // Skip if file already exists in dist root (like index.js from server build)
      if (fs.existsSync(destPath)) continue;
      
      // Copy file/directory
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    }
    
    console.log('✓ Build completed successfully');
    console.log('✓ Files restructured for deployment');
  } else {
    console.error('Public directory not found. Build may have failed.');
    process.exit(1);
  }
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}