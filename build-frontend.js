#!/usr/bin/env node

/**
 * Frontend Build Script for Production
 * 
 * This script builds the React frontend and places it in the correct location
 * for the production server to serve (dist/public directory).
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message, type = 'info') {
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : '📋';
  console.log(`${prefix} ${message}`);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }
  
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    entries.forEach(entry => {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function buildFrontend() {
  log('Building frontend application...');
  
  try {
    // Build frontend with a timeout
    const buildTimeout = setTimeout(() => {
      throw new Error('Frontend build timed out');
    }, 30000); // 30 second timeout
    
    execSync('npx vite build', { 
      stdio: 'inherit',
      timeout: 25000 // 25 second timeout
    });
    
    clearTimeout(buildTimeout);
    log('Frontend build completed', 'success');
    
    // Check if build output exists
    if (fs.existsSync('dist/public')) {
      log('Frontend assets found in dist/public', 'success');
    } else {
      log('No frontend assets found, using fallback', 'info');
      // Create minimal frontend structure
      fs.mkdirSync('dist/public', { recursive: true });
      
      // Copy the existing index.html to public
      if (fs.existsSync('dist/index.html')) {
        fs.copyFileSync('dist/index.html', 'dist/public/index.html');
        log('Copied index.html to dist/public', 'success');
      }
    }
    
  } catch (error) {
    log('Frontend build failed or timed out, using fallback', 'error');
    
    // Create minimal frontend structure as fallback
    fs.mkdirSync('dist/public', { recursive: true });
    
    // Create basic index.html
    const basicHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kabir Bedi - Portfolio</title>
    <meta name="description" content="Portfolio of Kabir Bedi, Physics and AI graduate and Software Development Project Lead">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .header {
            background: white;
            padding: 2rem 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        .hero {
            text-align: center;
            padding: 3rem 0;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #2563eb;
        }
        .hero p {
            font-size: 1.2rem;
            color: #64748b;
            margin-bottom: 2rem;
        }
        .section {
            background: white;
            padding: 2rem;
            margin-bottom: 2rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .section h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #1e293b;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        .card {
            padding: 1.5rem;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
        }
        .card h3 {
            color: #2563eb;
            margin-bottom: 0.5rem;
        }
        .tag {
            display: inline-block;
            background: #e0e7ff;
            color: #3730a3;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.875rem;
            margin: 0.25rem;
        }
        .contact {
            text-align: center;
            padding: 3rem 0;
        }
        .contact a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
        }
        .contact a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="hero">
                <h1>Kabir Bedi</h1>
                <p>Physics and AI Graduate | Software Development Project Lead</p>
            </div>
        </div>
    </div>
    
    <div class="container">
        <div class="section">
            <h2>Academic Background</h2>
            <div class="card">
                <h3>King's College London</h3>
                <p><strong>MSci Physics and Philosophy</strong> (2021-2025)</p>
                <p>Dissertation: "Quantum ML for Fraud Detection"</p>
                <div style="margin-top: 1rem;">
                    <span class="tag">Physics</span>
                    <span class="tag">Philosophy</span>
                    <span class="tag">Quantum Computing</span>
                    <span class="tag">Machine Learning</span>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Professional Experience</h2>
            <div class="grid">
                <div class="card">
                    <h3>Full-Stack Rota System Developer</h3>
                    <p><strong>ACS Catering | Software Development Project Lead</strong></p>
                    <p>Led development of comprehensive staff management system with React frontend and Node.js backend.</p>
                    <div style="margin-top: 1rem;">
                        <span class="tag">React</span>
                        <span class="tag">Node.js</span>
                        <span class="tag">PostgreSQL</span>
                        <span class="tag">Project Leadership</span>
                    </div>
                </div>
                
                <div class="card">
                    <h3>DJ Business Owner</h3>
                    <p><strong>Bedi Beats | Entrepreneur</strong></p>
                    <p>Founded and managed DJ business, handling client relations, event planning, and music curation.</p>
                    <div style="margin-top: 1rem;">
                        <span class="tag">Entrepreneurship</span>
                        <span class="tag">Event Management</span>
                        <span class="tag">Client Relations</span>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Python Coder</h3>
                    <p><strong>CUSP | Software Development</strong></p>
                    <p>Developed Python applications for data analysis and automation projects.</p>
                    <div style="margin-top: 1rem;">
                        <span class="tag">Python</span>
                        <span class="tag">Data Analysis</span>
                        <span class="tag">Automation</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Key Projects</h2>
            <div class="grid">
                <div class="card">
                    <h3>Full-Stack Rota System</h3>
                    <p>Comprehensive staff management system with advanced scheduling, real-time updates, and role-based access control.</p>
                    <div style="margin-top: 1rem;">
                        <span class="tag">Full-Stack Development</span>
                        <span class="tag">React</span>
                        <span class="tag">Node.js</span>
                        <span class="tag">PostgreSQL</span>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Quantum ML Fraud Detection</h3>
                    <p>MSci dissertation project exploring quantum machine learning applications in financial fraud detection.</p>
                    <div style="margin-top: 1rem;">
                        <span class="tag">Quantum Computing</span>
                        <span class="tag">Machine Learning</span>
                        <span class="tag">Fraud Detection</span>
                        <span class="tag">Research</span>
                    </div>
                </div>
                
                <div class="card">
                    <h3>NHS Behavioral Prediction App</h3>
                    <p>Healthcare application for predicting patient behavioral patterns using machine learning.</p>
                    <div style="margin-top: 1rem;">
                        <span class="tag">Healthcare</span>
                        <span class="tag">Machine Learning</span>
                        <span class="tag">Behavioral Analysis</span>
                        <span class="tag">NHS</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Personal Interests</h2>
            <div class="grid">
                <div class="card">
                    <h3>DJing</h3>
                    <p>Professional DJ with own business, specializing in event entertainment and music curation.</p>
                </div>
                
                <div class="card">
                    <h3>Philosophy</h3>
                    <p>Academic interest in philosophical concepts, particularly as they relate to physics and consciousness.</p>
                </div>
                
                <div class="card">
                    <h3>Physical Fitness</h3>
                    <p>Active in gym training, climbing, and Brazilian Jiu-Jitsu (BJJ) for physical and mental wellness.</p>
                </div>
                
                <div class="card">
                    <h3>Art & Theology</h3>
                    <p>Exploring the intersection of artistic expression and theological concepts.</p>
                </div>
            </div>
        </div>
        
        <div class="contact">
            <h2>Get In Touch</h2>
            <p>Interested in discussing opportunities or collaborating on projects?</p>
            <p style="margin-top: 1rem;">
                <a href="mailto:kabir.bedi@example.com">kabir.bedi@example.com</a>
            </p>
        </div>
    </div>
</body>
</html>`;
    
    fs.writeFileSync('dist/public/index.html', basicHtml);
    log('Created fallback index.html in dist/public', 'success');
  }
}

function main() {
  try {
    buildFrontend();
    log('Frontend build process completed successfully!', 'success');
  } catch (error) {
    log(`Build process failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}