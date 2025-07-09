#!/usr/bin/env node

/**
 * Optimized Deployment Build Script
 * 
 * This script provides a faster deployment solution by:
 * 1. Building with optimized settings
 * 2. Moving files to correct deployment structure
 * 3. Ensuring deployment readiness
 * 
 * Usage: node build-for-deployment.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(DIST_DIR, 'public');

console.log('🚀 Starting optimized deployment build...\n');

try {
  // Step 1: Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  console.log('✅ Previous builds cleaned\n');

  // Step 2: Build frontend with optimizations
  console.log('🔨 Building frontend (optimized)...');
  const viteEnv = {
    ...process.env,
    NODE_ENV: 'production',
    VITE_BUILD_SOURCEMAP: 'false' // Disable sourcemaps for faster build
  };
  
  execSync('vite build --mode production', { 
    stdio: 'inherit',
    env: viteEnv
  });
  console.log('✅ Frontend build completed\n');

  // Step 3: Build backend
  console.log('🔨 Building backend...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify', { 
    stdio: 'inherit' 
  });
  console.log('✅ Backend build completed\n');

  // Step 4: Fix deployment structure
  console.log('📁 Fixing deployment structure...');
  
  if (!fs.existsSync(PUBLIC_DIR)) {
    throw new Error('Frontend build output not found in dist/public');
  }

  // Move all files from dist/public to dist root
  const files = fs.readdirSync(PUBLIC_DIR);
  let movedCount = 0;
  
  for (const file of files) {
    const sourcePath = path.join(PUBLIC_DIR, file);
    const destPath = path.join(DIST_DIR, file);
    
    // Skip if file already exists in dist root (like index.js from server build)
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  Skipping ${file} - already exists in dist/`);
      continue;
    }
    
    // Move file/directory
    fs.renameSync(sourcePath, destPath);
    console.log(`📄 Moved: ${file}`);
    movedCount++;
  }
  
  // Remove empty public directory
  if (fs.readdirSync(PUBLIC_DIR).length === 0) {
    fs.rmdirSync(PUBLIC_DIR);
    console.log('🗑️  Removed empty public directory');
  }
  
  console.log(`\n✅ Structure fixed! ${movedCount} items moved\n`);

  // Step 5: Verify deployment structure
  console.log('🔍 Verifying deployment structure...');
  
  const requiredFiles = ['index.html', 'index.js'];
  const missingFiles = [];
  
  for (const file of requiredFiles) {
    const filePath = path.join(DIST_DIR, file);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file);
    } else {
      console.log(`✅ Found: ${file}`);
    }
  }
  
  if (missingFiles.length > 0) {
    throw new Error(`Missing required files: ${missingFiles.join(', ')}`);
  }

  // Step 6: Display final structure
  console.log('\n📋 Final deployment structure:');
  console.log('   dist/');
  console.log('   ├── index.html      ✅ (frontend entry point)');
  console.log('   ├── index.js        ✅ (backend server)');
  console.log('   └── assets/         ✅ (static assets)');
  
  console.log('\n🎉 Deployment build completed successfully!');
  console.log('🚀 Project is ready for deployment');

} catch (error) {
  console.error('\n❌ Deployment build failed:');
  console.error(error.message);
  
  if (error.stdout) {
    console.error('\nBuild output:');
    console.error(error.stdout.toString());
  }
  
  if (error.stderr) {
    console.error('\nBuild errors:');
    console.error(error.stderr.toString());
  }
  
  console.error('\n🔧 Try running:');
  console.error('   1. npm install');
  console.error('   2. npm run dev (to test locally)');
  console.error('   3. node build-for-deployment.js (retry deployment build)');
  
  process.exit(1);
}