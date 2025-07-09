#!/usr/bin/env node

/**
 * Emergency Deployment Script
 * 
 * This script creates a minimal deployment-ready structure by:
 * 1. Building only the essential files
 * 2. Creating the required deployment structure
 * 3. Ensuring compatibility with Replit static deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(DIST_DIR, 'public');
const CLIENT_DIR = path.join(ROOT_DIR, 'client');

function log(message, type = 'info') {
  const icons = { info: '📋', success: '✅', warning: '⚠️', error: '❌' };
  console.log(`${icons[type]} ${message}`);
}

function buildBackend() {
  log('Building backend server...');
  try {
    // Ensure dist directory exists
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR, { recursive: true });
    }
    
    // Build backend with esbuild
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify', { 
      stdio: 'inherit',
      timeout: 60000 // 1 minute timeout
    });
    
    log('Backend build completed', 'success');
    return true;
  } catch (error) {
    log(`Backend build failed: ${error.message}`, 'error');
    return false;
  }
}

function buildFrontendMinimal() {
  log('Building frontend with minimal config...');
  
  try {
    // Create public directory
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    
    // Run vite build with shorter timeout
    execSync('vite build --mode production', { 
      stdio: 'inherit',
      timeout: 180000, // 3 minutes timeout
      cwd: ROOT_DIR
    });
    
    log('Frontend build completed', 'success');
    return true;
  } catch (error) {
    log(`Frontend build failed or timed out: ${error.message}`, 'warning');
    return false;
  }
}

function createBasicDeploymentStructure() {
  log('Creating basic deployment structure...');
  
  // Create a basic index.html if it doesn't exist
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    const basicHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kabir Bedi - Portfolio</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #333; text-align: center; margin-bottom: 30px; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #666; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    .loading { text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Kabir Bedi</h1>
    <div class="section">
      <h2>About</h2>
      <p>Physics and AI graduate and Software Development Project Lead</p>
    </div>
    <div class="section">
      <h2>Experience</h2>
      <ul>
        <li>Full-Stack Rota System Developer</li>
        <li>DJ Business Owner</li>
        <li>Python Coder at CUSP</li>
        <li>KCL DJ Society President</li>
        <li>Neuroscience Research Assistant</li>
      </ul>
    </div>
    <div class="section">
      <h2>Projects</h2>
      <ul>
        <li>Full-Stack Rota System</li>
        <li>Quantum ML Fraud Detection</li>
        <li>NHS Behavioral Prediction App</li>
        <li>Vizent Python Library Testing</li>
      </ul>
    </div>
    <div class="section">
      <h2>Contact</h2>
      <p>This is a basic deployment version. The full interactive portfolio is being prepared.</p>
    </div>
  </div>
</body>
</html>`;
    
    fs.writeFileSync(indexHtmlPath, basicHtml);
    log('Created basic index.html', 'success');
  }
  
  // Create assets directory
  const assetsDir = path.join(DIST_DIR, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
    fs.writeFileSync(path.join(assetsDir, 'style.css'), 'body { font-family: Arial, sans-serif; }');
    log('Created assets directory', 'success');
  }
  
  return true;
}

function fixDeploymentStructure() {
  log('Fixing deployment structure...');
  
  if (fs.existsSync(PUBLIC_DIR)) {
    // Copy files from dist/public to dist root
    const items = fs.readdirSync(PUBLIC_DIR);
    
    for (const item of items) {
      const sourcePath = path.join(PUBLIC_DIR, item);
      const destPath = path.join(DIST_DIR, item);
      
      if (!fs.existsSync(destPath)) {
        if (fs.statSync(sourcePath).isDirectory()) {
          fs.cpSync(sourcePath, destPath, { recursive: true });
        } else {
          fs.copyFileSync(sourcePath, destPath);
        }
        log(`Copied: ${item}`);
      }
    }
  }
  
  return true;
}

function verifyDeployment() {
  log('Verifying deployment structure...');
  
  const checks = [
    { path: path.join(DIST_DIR, 'index.html'), name: 'Frontend entry point' },
    { path: path.join(DIST_DIR, 'index.js'), name: 'Backend server' },
    { path: path.join(DIST_DIR, 'assets'), name: 'Assets directory' }
  ];
  
  let allGood = true;
  
  for (const check of checks) {
    const exists = fs.existsSync(check.path);
    log(`${check.name}: ${exists ? 'OK' : 'MISSING'}`, exists ? 'success' : 'error');
    if (!exists) allGood = false;
  }
  
  return allGood;
}

function main() {
  log('🚀 Emergency deployment starting...');
  
  // Step 1: Build backend
  if (!buildBackend()) {
    log('Backend build failed, but continuing...', 'warning');
  }
  
  // Step 2: Try to build frontend
  const frontendBuilt = buildFrontendMinimal();
  
  // Step 3: Create basic structure if needed
  if (!frontendBuilt) {
    log('Frontend build failed, creating basic structure...', 'warning');
    createBasicDeploymentStructure();
  }
  
  // Step 4: Fix deployment structure
  fixDeploymentStructure();
  
  // Step 5: Verify deployment
  if (verifyDeployment()) {
    log('🎉 Emergency deployment ready!', 'success');
    log('Files are correctly positioned for static deployment.');
  } else {
    log('Deployment verification failed.', 'error');
    process.exit(1);
  }
}

main();