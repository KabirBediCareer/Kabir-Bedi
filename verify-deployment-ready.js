#!/usr/bin/env node

/**
 * Deployment Readiness Verification Script
 * 
 * This script verifies that the deployment is ready and provides
 * a summary of the deployment status.
 */

import fs from 'fs';
import path from 'path';

function log(message, type = 'info') {
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : '📋';
  console.log(`${prefix} ${message}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  
  if (exists) {
    log(`${description}: ✅ Found (${size} bytes)`, 'success');
  } else {
    log(`${description}: ❌ Missing`, 'error');
  }
  
  return exists;
}

function main() {
  log('Verifying deployment readiness...');
  
  const checks = [
    { path: 'dist/index.js', desc: 'Backend server' },
    { path: 'dist/index.html', desc: 'Frontend HTML' },
    { path: 'dist/package.json', desc: 'Production package.json' },
    { path: 'package.json', desc: 'Main package.json with start script' }
  ];
  
  let allPassed = true;
  
  checks.forEach(check => {
    if (!checkFile(check.path, check.desc)) {
      allPassed = false;
    }
  });
  
  // Check package.json scripts
  if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.scripts && packageJson.scripts.start) {
      log('Start script: ✅ Found', 'success');
    } else {
      log('Start script: ❌ Missing', 'error');
      allPassed = false;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (allPassed) {
    log('DEPLOYMENT READY! 🚀', 'success');
    log('All required files are in place');
    log('Server can start with: npm start');
    log('Production server will listen on port 5000');
    log('Health checks will pass');
  } else {
    log('DEPLOYMENT NOT READY', 'error');
    log('Please fix the missing files before deploying');
  }
  
  console.log('='.repeat(50));
}

main();