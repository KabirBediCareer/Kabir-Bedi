#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  console.log('Starting deployment build process...');
  
  // Step 1: Build the project normally
  console.log('Building frontend and backend...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Step 2: Check if dist/public exists and restructure files
  const publicPath = path.join(process.cwd(), 'dist', 'public');
  const distPath = path.join(process.cwd(), 'dist');
  
  if (fs.existsSync(publicPath)) {
    console.log('Restructuring files for deployment...');
    
    // Read all files from dist/public
    const files = fs.readdirSync(publicPath);
    
    for (const file of files) {
      const sourcePath = path.join(publicPath, file);
      const destPath = path.join(distPath, file);
      
      // Skip if file already exists in dist root (like index.js from server build)
      if (fs.existsSync(destPath)) {
        console.log(`Skipping ${file} - already exists in dist/`);
        continue;
      }
      
      // Copy file/directory
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, destPath, { recursive: true });
        console.log(`Copied directory: ${file}`);
      } else {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied file: ${file}`);
      }
    }
    
    console.log('✓ Deployment build completed successfully');
    console.log('✓ Files are now in dist/ directory for deployment');
    
    // List the final structure
    console.log('\nFinal dist/ structure:');
    const distFiles = fs.readdirSync(distPath);
    distFiles.forEach(file => {
      const filePath = path.join(distPath, file);
      const isDir = fs.statSync(filePath).isDirectory();
      console.log(`  ${isDir ? '📁' : '📄'} ${file}`);
    });
  } else {
    console.error('❌ dist/public directory not found. Build may have failed.');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Deployment build failed:', error.message);
  process.exit(1);
}