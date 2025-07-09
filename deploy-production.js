#!/usr/bin/env node

/**
 * Production Deployment Script
 * 
 * This script ensures the application is ready for production deployment by:
 * 1. Building the backend server
 * 2. Creating the required frontend structure
 * 3. Ensuring all files are in the correct locations
 * 4. Verifying deployment readiness
 * 
 * Usage: node deploy-production.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message, type = 'info') {
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : '📋';
  console.log(`${prefix} ${message}`);
}

function buildBackend() {
  log('Building backend server...');
  
  try {
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
      stdio: 'inherit'
    });
    log('Backend build completed successfully', 'success');
  } catch (error) {
    log(`Backend build failed: ${error.message}`, 'error');
    throw error;
  }
}

function ensureFrontendStructure() {
  log('Ensuring frontend structure...');
  
  const publicDir = 'dist/public';
  const indexHtmlPath = path.join(publicDir, 'index.html');
  
  // Create public directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // If index.html doesn't exist in public, create it
  if (!fs.existsSync(indexHtmlPath)) {
    // Check if there's an index.html in dist root
    const rootIndexPath = 'dist/index.html';
    if (fs.existsSync(rootIndexPath)) {
      fs.copyFileSync(rootIndexPath, indexHtmlPath);
      log('Copied index.html to public directory', 'success');
    } else {
      log('No index.html found, frontend structure needs to be created', 'error');
      throw new Error('Frontend index.html not found');
    }
  } else {
    log('Frontend structure already exists', 'success');
  }
}

function ensurePackageJson() {
  log('Ensuring production package.json...');
  
  const packageJsonPath = 'dist/package.json';
  
  if (!fs.existsSync(packageJsonPath)) {
    const packageJson = {
      "name": "kabir-bedi-portfolio",
      "version": "1.0.0",
      "type": "module",
      "main": "index.js",
      "scripts": {
        "start": "node index.js"
      },
      "dependencies": {
        "express": "^4.21.2",
        "express-session": "^1.18.1",
        "memorystore": "^1.6.7",
        "nanoid": "^5.1.5",
        "passport": "^0.7.0",
        "passport-local": "^1.0.0"
      }
    };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    log('Created production package.json', 'success');
  } else {
    log('Production package.json already exists', 'success');
  }
}

function verifyDeployment() {
  log('Verifying deployment readiness...');
  
  const requiredFiles = [
    { path: 'dist/index.js', desc: 'Backend server' },
    { path: 'dist/public/index.html', desc: 'Frontend HTML' },
    { path: 'dist/package.json', desc: 'Production package.json' }
  ];
  
  let allFilesExist = true;
  
  for (const file of requiredFiles) {
    if (fs.existsSync(file.path)) {
      const size = fs.statSync(file.path).size;
      log(`${file.desc}: Found (${size} bytes)`, 'success');
    } else {
      log(`${file.desc}: Missing`, 'error');
      allFilesExist = false;
    }
  }
  
  if (allFilesExist) {
    log('All deployment files are ready!', 'success');
    log('The application can be started with: npm start', 'info');
    log('Server will listen on port 5000', 'info');
  } else {
    throw new Error('Some deployment files are missing');
  }
}

function main() {
  try {
    log('Starting production deployment process...');
    
    // Build backend
    buildBackend();
    
    // Ensure frontend structure
    ensureFrontendStructure();
    
    // Ensure package.json
    ensurePackageJson();
    
    // Verify deployment
    verifyDeployment();
    
    log('Production deployment completed successfully!', 'success');
    
  } catch (error) {
    log(`Deployment failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}