#!/usr/bin/env node

/**
 * Complete Deployment Script
 * 
 * This script provides a comprehensive deployment solution that:
 * 1. Builds both frontend and backend
 * 2. Restructures files for deployment
 * 3. Provides clear feedback and error handling
 * 
 * Usage: node deploy.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting deployment build process...\n');

try {
  // Step 1: Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }
  console.log('✅ Previous builds cleaned\n');

  // Step 2: Build frontend
  console.log('🔨 Building frontend (Vite)...');
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Frontend build completed\n');

  // Step 3: Build backend
  console.log('🔨 Building backend (ESBuild)...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  console.log('✅ Backend build completed\n');

  // Step 4: Restructure files for deployment
  console.log('📁 Restructuring files for deployment...');
  
  const publicPath = path.join(process.cwd(), 'dist', 'public');
  const rootDistPath = path.join(process.cwd(), 'dist');
  
  if (!fs.existsSync(publicPath)) {
    throw new Error('Frontend build output not found in dist/public');
  }

  // Copy all files from dist/public to dist root
  const files = fs.readdirSync(publicPath);
  let copiedCount = 0;
  
  for (const file of files) {
    const sourcePath = path.join(publicPath, file);
    const destPath = path.join(rootDistPath, file);
    
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
    copiedCount++;
  }
  
  console.log(`\n✅ Restructuring completed! ${copiedCount} items copied\n`);

  // Step 5: Verify deployment structure
  console.log('🔍 Verifying deployment structure...');
  
  const requiredFiles = ['index.html', 'index.js'];
  const missingFiles = [];
  
  for (const file of requiredFiles) {
    const filePath = path.join(rootDistPath, file);
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
  console.log('   ├── assets/         ✅ (static assets)');
  console.log('   └── public/         📁 (original build output)');
  
  console.log('\n🎉 Deployment build completed successfully!');
  console.log('🚀 Project is ready for deployment');
  console.log('\n💡 To deploy:');
  console.log('   1. Commit your changes');
  console.log('   2. Click the Deploy button in Replit');
  console.log('   3. Files are now in the correct location for static deployment');

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
  
  console.error('\n🔧 Troubleshooting:');
  console.error('   1. Ensure all dependencies are installed: npm install');
  console.error('   2. Check for syntax errors: npm run check');
  console.error('   3. Test in development: npm run dev');
  console.error('   4. Review the error messages above');
  
  process.exit(1);
}