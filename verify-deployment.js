#!/usr/bin/env node

/**
 * Deployment Verification Script
 * 
 * This script verifies that all files are correctly positioned for deployment
 * and provides a summary of the deployment readiness.
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${description}: ${filePath}`);
  return exists;
}

function checkDirectory(dirPath, description) {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${description}: ${dirPath}`);
  if (exists) {
    const files = fs.readdirSync(dirPath);
    console.log(`   Contains ${files.length} files: ${files.join(', ')}`);
  }
  return exists;
}

function main() {
  console.log('🔍 Verifying deployment readiness...\n');
  
  let allGood = true;
  
  // Check critical files for deployment
  console.log('📋 Checking critical deployment files:');
  allGood &= checkFile(path.join(DIST_DIR, 'index.html'), 'Frontend entry point');
  allGood &= checkFile(path.join(DIST_DIR, 'index.js'), 'Backend server');
  allGood &= checkDirectory(path.join(DIST_DIR, 'assets'), 'Static assets directory');
  
  console.log('\n📋 Checking build structure:');
  allGood &= checkDirectory(path.join(DIST_DIR, 'public'), 'Original Vite build output');
  
  // Check .replit configuration
  console.log('\n📋 Checking Replit configuration:');
  const replitFile = path.join(ROOT_DIR, '.replit');
  if (fs.existsSync(replitFile)) {
    const content = fs.readFileSync(replitFile, 'utf-8');
    const hasStaticDeployment = content.includes('deploymentTarget = "static"');
    const hasDistPublicDir = content.includes('publicDir = "dist"');
    const hasBuildCommand = content.includes('build = ["npm", "run", "build"]');
    
    console.log(`${hasStaticDeployment ? '✅' : '❌'} Static deployment target configured`);
    console.log(`${hasDistPublicDir ? '✅' : '❌'} Public directory set to 'dist'`);
    console.log(`${hasBuildCommand ? '✅' : '❌'} Build command configured`);
    
    allGood &= hasStaticDeployment && hasDistPublicDir && hasBuildCommand;
  } else {
    console.log('❌ .replit file not found');
    allGood = false;
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  if (allGood) {
    console.log('✅ DEPLOYMENT READY');
    console.log('All files are correctly positioned for static deployment.');
    console.log('You can now deploy your application using Replit Deploy.');
  } else {
    console.log('❌ DEPLOYMENT NOT READY');
    console.log('Please fix the issues above before deploying.');
  }
  console.log('='.repeat(50));
  
  process.exit(allGood ? 0 : 1);
}

main();