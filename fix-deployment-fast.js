#!/usr/bin/env node

/**
 * Fast Deployment Fix
 * 
 * This script quickly fixes the deployment structure issue by:
 * 1. Assuming the build has already been done
 * 2. Moving files from dist/public to dist for deployment compatibility
 * 3. Providing immediate feedback
 * 
 * Usage: node fix-deployment-fast.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(DIST_DIR, 'public');

console.log('⚡ Fast deployment fix starting...\n');

try {
  // Check if we need to build first
  if (!fs.existsSync(DIST_DIR)) {
    console.log('📦 No dist directory found, creating minimal build...');
    
    // Create dist directory
    fs.mkdirSync(DIST_DIR, { recursive: true });
    
    // Run only the backend build (much faster)
    console.log('🔨 Building backend only...');
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify', { 
      stdio: 'inherit' 
    });
    
    // Create a minimal index.html for deployment
    const minimalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - Build Required</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .message { max-width: 600px; margin: 0 auto; }
        .error { color: #e74c3c; }
        .info { color: #3498db; }
    </style>
</head>
<body>
    <div class="message">
        <h1 class="error">Frontend Build Required</h1>
        <p class="info">The frontend needs to be built. Please run:</p>
        <p><code>npm run build</code></p>
        <p>Or use the deployment script:</p>
        <p><code>node build-for-deployment.js</code></p>
    </div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), minimalHtml);
    console.log('✅ Minimal deployment structure created');
    console.log('⚠️  Frontend build still required for full functionality');
    
  } else if (fs.existsSync(PUBLIC_DIR)) {
    // Standard fix: move files from public to dist
    console.log('📁 Moving files from dist/public to dist...');
    
    const files = fs.readdirSync(PUBLIC_DIR);
    let movedCount = 0;
    
    for (const file of files) {
      const sourcePath = path.join(PUBLIC_DIR, file);
      const destPath = path.join(DIST_DIR, file);
      
      // Skip if file already exists in dist root
      if (fs.existsSync(destPath)) {
        console.log(`⏭️  Skipping ${file} - already exists in dist/`);
        continue;
      }
      
      // Move file/directory
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.renameSync(sourcePath, destPath);
        console.log(`📂 Moved directory: ${file}`);
      } else {
        fs.renameSync(sourcePath, destPath);
        console.log(`📄 Moved file: ${file}`);
      }
      movedCount++;
    }
    
    // Remove empty public directory
    if (fs.readdirSync(PUBLIC_DIR).length === 0) {
      fs.rmdirSync(PUBLIC_DIR);
      console.log('🗑️  Removed empty public directory');
    }
    
    console.log(`\n✅ Structure fixed! ${movedCount} items moved`);
    
  } else {
    console.log('ℹ️  No dist/public directory found - structure already correct or no build exists');
  }

  // Verify deployment readiness
  console.log('\n🔍 Verifying deployment structure...');
  
  const requiredFiles = ['index.html', 'index.js'];
  const foundFiles = [];
  const missingFiles = [];
  
  for (const file of requiredFiles) {
    const filePath = path.join(DIST_DIR, file);
    if (fs.existsSync(filePath)) {
      foundFiles.push(file);
      console.log(`✅ Found: ${file}`);
    } else {
      missingFiles.push(file);
      console.log(`❌ Missing: ${file}`);
    }
  }
  
  if (foundFiles.length === requiredFiles.length) {
    console.log('\n🎉 Deployment structure is ready!');
    console.log('🚀 You can now deploy your application');
  } else {
    console.log('\n⚠️  Deployment structure needs attention:');
    console.log('   Missing files:', missingFiles.join(', '));
    console.log('   Run a full build: npm run build');
  }
  
  // Show final structure
  console.log('\n📋 Current deployment structure:');
  console.log('   dist/');
  const distFiles = fs.readdirSync(DIST_DIR);
  distFiles.forEach(file => {
    const filePath = path.join(DIST_DIR, file);
    const isDir = fs.statSync(filePath).isDirectory();
    const icon = isDir ? '📁' : '📄';
    console.log(`   ${icon} ${file}`);
  });

} catch (error) {
  console.error('\n❌ Deployment fix failed:');
  console.error(error.message);
  
  console.error('\n💡 Try these steps:');
  console.error('   1. Ensure dependencies are installed: npm install');
  console.error('   2. Run a full build: npm run build');
  console.error('   3. Then run this script again');
  
  process.exit(1);
}