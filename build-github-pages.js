#!/usr/bin/env node

/**
 * GitHub Pages Build Script
 * 
 * This script builds the portfolio for GitHub Pages deployment
 * by creating a static version that works without a backend server.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function log(message, type = 'info') {
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : '📋';
  console.log(`${prefix} ${message}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function main() {
  try {
    log('Building portfolio for GitHub Pages...');
    
    // Ensure dist directory exists
    ensureDir('dist');
    
    // Build frontend with Vite
    log('Building frontend...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Create a static HTML file for GitHub Pages
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kabir Bedi - Portfolio</title>
    <meta name="description" content="Portfolio of Kabir Bedi, Physics and AI graduate and Software Development Project Lead">
    <link rel="stylesheet" href="./assets/index.css">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="./assets/index.js"></script>
</body>
</html>`;
    
    // Copy files from dist/public to dist root for GitHub Pages
    const publicDir = path.join('dist', 'public');
    if (fs.existsSync(publicDir)) {
      const items = fs.readdirSync(publicDir);
      
      for (const item of items) {
        const sourcePath = path.join(publicDir, item);
        const destPath = path.join('dist', item);
        
        if (fs.statSync(sourcePath).isDirectory()) {
          fs.cpSync(sourcePath, destPath, { recursive: true });
        } else {
          fs.copyFileSync(sourcePath, destPath);
        }
      }
      
      log('Copied static files to dist root');
    }
    
    // Ensure index.html exists in dist root
    const indexPath = path.join('dist', 'index.html');
    if (!fs.existsSync(indexPath)) {
      fs.writeFileSync(indexPath, htmlContent);
      log('Created index.html for GitHub Pages');
    }
    
    log('GitHub Pages build completed successfully!', 'success');
    log('Files ready for deployment:');
    log('- dist/index.html');
    log('- dist/assets/');
    
  } catch (error) {
    log(`Build failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

main();