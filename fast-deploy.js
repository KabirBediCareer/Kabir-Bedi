#!/usr/bin/env node

/**
 * Fast Deployment Script
 * 
 * This script provides a quick deployment solution by:
 * 1. Running build with timeout protection
 * 2. Fixing deployment structure immediately
 * 3. Verifying deployment readiness
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(DIST_DIR, 'public');

function log(message, type = 'info') {
  const icons = { info: '📋', success: '✅', warning: '⚠️', error: '❌' };
  console.log(`${icons[type]} ${message}`);
}

function runBuild() {
  log('Building project...');
  
  try {
    // Run build with timeout protection
    execSync('timeout 300 npm run build', { 
      stdio: 'inherit',
      timeout: 300000 // 5 minutes
    });
    log('Build completed successfully', 'success');
    return true;
  } catch (error) {
    if (error.signal === 'SIGTERM') {
      log('Build timed out, checking if partial build is usable...', 'warning');
      return fs.existsSync(PUBLIC_DIR);
    }
    log(`Build failed: ${error.message}`, 'error');
    return false;
  }
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
  log('Fixing deployment structure...');
  
  if (!fs.existsSync(PUBLIC_DIR)) {
    log('dist/public not found. Build may have failed.', 'error');
    return false;
  }
  
  // Copy files from dist/public to dist
  const items = fs.readdirSync(PUBLIC_DIR);
  let copiedCount = 0;
  
  for (const item of items) {
    const sourcePath = path.join(PUBLIC_DIR, item);
    const destPath = path.join(DIST_DIR, item);
    
    if (fs.existsSync(destPath)) {
      log(`Skipping ${item} - already exists in dist/`);
      continue;
    }
    
    try {
      copyRecursive(sourcePath, destPath);
      copiedCount++;
      log(`Copied: ${item}`);
    } catch (error) {
      log(`Failed to copy ${item}: ${error.message}`, 'error');
    }
  }
  
  log(`Deployment structure fixed! Copied ${copiedCount} items`, 'success');
  return true;
}

function verifyDeployment() {
  log('Verifying deployment readiness...');
  
  const requiredFiles = [
    { path: path.join(DIST_DIR, 'index.html'), desc: 'Frontend entry point' },
    { path: path.join(DIST_DIR, 'index.js'), desc: 'Backend server' },
    { path: path.join(DIST_DIR, 'assets'), desc: 'Static assets' }
  ];
  
  let allGood = true;
  
  for (const file of requiredFiles) {
    const exists = fs.existsSync(file.path);
    log(`${file.desc}: ${exists ? 'OK' : 'MISSING'}`, exists ? 'success' : 'error');
    allGood = allGood && exists;
  }
  
  return allGood;
}

function main() {
  log('🚀 Starting fast deployment process...');
  
  // Step 1: Build the project
  if (!runBuild()) {
    log('Build failed. Cannot proceed with deployment.', 'error');
    process.exit(1);
  }
  
  // Step 2: Fix deployment structure
  if (!fixDeploymentStructure()) {
    log('Failed to fix deployment structure.', 'error');
    process.exit(1);
  }
  
  // Step 3: Verify deployment
  if (!verifyDeployment()) {
    log('Deployment verification failed.', 'error');
    process.exit(1);
  }
  
  log('🎉 Deployment is ready!', 'success');
  log('You can now deploy your application using Replit Deploy.');
}

main();