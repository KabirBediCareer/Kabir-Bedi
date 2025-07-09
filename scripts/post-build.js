#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Copy contents from dist/public to dist for deployment
console.log('Restructuring files for deployment...');
const publicPath = path.join(process.cwd(), 'dist', 'public');
const distPath = path.join(process.cwd(), 'dist');

try {
  if (fs.existsSync(publicPath)) {
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
    
    console.log('✓ Files restructured successfully for deployment');
    console.log('✓ Static files are now in dist/ for deployment');
  } else {
    console.error('dist/public directory not found. Build may have failed.');
    process.exit(1);
  }
} catch (error) {
  console.error('Error restructuring files:', error.message);
  process.exit(1);
}