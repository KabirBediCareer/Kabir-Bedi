#!/usr/bin/env node

/**
 * Deployment Structure Fix
 * 
 * This script solves the deployment issue by copying files from dist/public to dist.
 * It's designed to be run after the build process completes.
 * 
 * Usage: node fix-deployment-structure.js
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(DIST_DIR, 'public');

function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = {
    info: '📋',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  }[type];
  
  console.log(`${prefix} ${message}`);
}

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function fixDeploymentStructure() {
  log('Starting deployment structure fix...');
  
  // Check if dist/public exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    log('dist/public directory not found. Please run the build process first.', 'error');
    log('Run: npm run build', 'info');
    process.exit(1);
  }
  
  // Ensure dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
  
  // Get all items in dist/public
  const items = fs.readdirSync(PUBLIC_DIR);
  log(`Found ${items.length} items in dist/public`);
  
  let copiedCount = 0;
  let skippedCount = 0;
  
  // Copy each item from dist/public to dist
  for (const item of items) {
    const sourcePath = path.join(PUBLIC_DIR, item);
    const destPath = path.join(DIST_DIR, item);
    
    // Skip if already exists in dist root (e.g., index.js from server build)
    if (fs.existsSync(destPath)) {
      log(`Skipping ${item} - already exists in dist/`);
      skippedCount++;
      continue;
    }
    
    try {
      copyRecursive(sourcePath, destPath);
      const type = fs.statSync(sourcePath).isDirectory() ? 'directory' : 'file';
      log(`Copied ${type}: ${item}`);
      copiedCount++;
    } catch (error) {
      log(`Failed to copy ${item}: ${error.message}`, 'error');
    }
  }
  
  log(`Deployment structure fix completed!`, 'success');
  log(`Copied: ${copiedCount} items, Skipped: ${skippedCount} items`);
  
  // Verify critical files exist
  const criticalFiles = ['index.html'];
  const missingFiles = criticalFiles.filter(file => !fs.existsSync(path.join(DIST_DIR, file)));
  
  if (missingFiles.length > 0) {
    log(`Missing critical files: ${missingFiles.join(', ')}`, 'error');
    process.exit(1);
  }
  
  // Show final structure
  log('\nFinal deployment structure:');
  console.log('   dist/');
  console.log('   ├── index.html      (frontend entry - required for deployment)');
  console.log('   ├── assets/         (static assets)');
  console.log('   ├── index.js        (backend server)');
  console.log('   └── public/         (original vite build output)');
  
  log('\nDeployment is now ready!', 'success');
}

// Run the fix
try {
  fixDeploymentStructure();
} catch (error) {
  log(`Deployment fix failed: ${error.message}`, 'error');
  process.exit(1);
}