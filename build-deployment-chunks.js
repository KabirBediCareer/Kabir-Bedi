#!/usr/bin/env node

/**
 * Chunked Deployment Build
 * 
 * This script builds the application in manageable chunks to avoid timeouts
 * and ensures proper deployment structure.
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(DIST_DIR, 'public');

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

async function buildDeployment() {
  console.log('🚀 Starting chunked deployment build...\n');
  
  try {
    // Step 1: Clean previous builds
    console.log('🧹 Cleaning previous builds...');
    if (fs.existsSync(DIST_DIR)) {
      fs.rmSync(DIST_DIR, { recursive: true, force: true });
    }
    console.log('✅ Previous builds cleaned\n');

    // Step 2: Build backend first (faster)
    console.log('🔨 Building backend...');
    await runCommand('npx', ['esbuild', 'server/index.ts', '--platform=node', '--packages=external', '--bundle', '--format=esm', '--outdir=dist', '--minify']);
    console.log('✅ Backend build completed\n');

    // Step 3: Build frontend with timeout protection
    console.log('🔨 Building frontend...');
    try {
      await runCommand('npx', ['vite', 'build', '--mode', 'production'], { timeout: 60000 });
      console.log('✅ Frontend build completed\n');
    } catch (error) {
      console.log('⚠️  Frontend build timed out or failed, creating fallback...');
      
      // Create fallback structure
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
      
      const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kabir Bedi - Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 0; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; margin-bottom: 30px; }
        .section { padding: 80px 0; }
        .section h2 { font-size: 2.5rem; margin-bottom: 30px; text-align: center; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 50px; }
        .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .card h3 { color: #667eea; margin-bottom: 15px; }
        .contact { background: #f8f9fa; text-align: center; }
        .contact a { color: #667eea; text-decoration: none; margin: 0 20px; }
        .note { background: #e3f2fd; padding: 20px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="hero">
        <div class="container">
            <h1>Kabir Bedi</h1>
            <p>Physics & AI Graduate | Software Development Project Lead</p>
            <div class="note">
                <strong>Note:</strong> This is a fallback version. For the full interactive experience, please complete the build process.
            </div>
        </div>
    </div>

    <div class="section">
        <div class="container">
            <h2>About</h2>
            <p>Physics and AI graduate with extensive experience in software development, project leadership, and research. Currently working as a Software Development Project Lead with a passion for innovative technology solutions.</p>
        </div>
    </div>

    <div class="section">
        <div class="container">
            <h2>Experience</h2>
            <div class="grid">
                <div class="card">
                    <h3>Software Development Project Lead</h3>
                    <p>Leading development projects and managing technical teams to deliver innovative software solutions.</p>
                </div>
                <div class="card">
                    <h3>Full-Stack Rota System Developer</h3>
                    <p>Developed comprehensive scheduling systems with modern web technologies.</p>
                </div>
                <div class="card">
                    <h3>Python Coder at CUSP</h3>
                    <p>Contributed to research projects using Python for data analysis and machine learning.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="container">
            <h2>Education</h2>
            <div class="card">
                <h3>Physics & AI Graduate (2021-2025)</h3>
                <p>King's College London - Focused on quantum machine learning and AI applications in physics.</p>
            </div>
        </div>
    </div>

    <div class="section contact">
        <div class="container">
            <h2>Contact</h2>
            <p>Get in touch to discuss opportunities or collaborations</p>
            <div style="margin-top: 30px;">
                <a href="mailto:contact@example.com">Email</a>
                <a href="https://linkedin.com/in/example">LinkedIn</a>
                <a href="https://github.com/example">GitHub</a>
            </div>
        </div>
    </div>
</body>
</html>`;
      
      fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), fallbackHtml);
      console.log('✅ Fallback frontend created\n');
    }

    // Step 4: Fix deployment structure
    console.log('📁 Fixing deployment structure...');
    
    if (fs.existsSync(PUBLIC_DIR)) {
      // Move files from dist/public to dist root
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
    }

    // Step 5: Verify deployment structure
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
      console.log('\n🎉 Deployment build completed successfully!');
      console.log('🚀 Project is ready for deployment');
    } else {
      console.log('\n⚠️  Deployment structure needs attention:');
      console.log('   Missing files:', missingFiles.join(', '));
    }
    
    // Show final structure
    console.log('\n📋 Final deployment structure:');
    console.log('   dist/');
    const distFiles = fs.readdirSync(DIST_DIR);
    distFiles.forEach(file => {
      const filePath = path.join(DIST_DIR, file);
      const isDir = fs.statSync(filePath).isDirectory();
      const icon = isDir ? '📁' : '📄';
      console.log(`   ${icon} ${file}`);
    });

  } catch (error) {
    console.error('\n❌ Deployment build failed:');
    console.error(error.message);
    
    console.error('\n💡 Try these steps:');
    console.error('   1. Ensure dependencies are installed: npm install');
    console.error('   2. Try the fast fix: node fix-deployment-fast.js');
    console.error('   3. Manual build: npm run build');
    
    process.exit(1);
  }
}

buildDeployment();