# Portfolio Website

## Overview

This is a React-based portfolio website for Kabir Bedi, a Physics and AI graduate and Software Development Project Lead. The application showcases his professional experience, academic background, personal projects, and contact information through a modern, responsive single-page design.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- Updated portfolio with Kabir Bedi's comprehensive CV information (January 2025)
- Added real work experience including Full-Stack Rota System Developer, DJ Business Owner, Python Coder at CUSP, KCL DJ Society President, and Neuroscience Research Assistant
- Updated projects section with actual projects: Full-Stack Rota System, Quantum ML Fraud Detection, NHS Behavioral Prediction App, and Vizent Python Library Testing
- Modified personal interests to reflect actual hobbies: DJing, Philosophy, Gym & Wellness, Climbing, Martial Arts (BJJ), and Art & Theology
- Updated academic section with correct graduation timeline (2021-2025) and dissertation details
- Fixed deployment build structure issue (July 2025) - created post-build scripts to copy files from dist/public to dist for proper static deployment
- Enhanced deployment fix with multiple script options and comprehensive documentation (July 2025)
- Created comprehensive deployment solution (July 2025) - added fix-deployment-structure.js, deploy.js, and DEPLOYMENT_SOLUTION.md to resolve static deployment issues
- ✅ **RESOLVED deployment structure issue** (July 2025) - Successfully applied deployment fix using existing scripts, files now properly structured in dist/ directory for static deployment
- ✅ **FINAL DEPLOYMENT READY** (July 2025) - Created comprehensive deployment structure with index.html in dist/, assets directory, and backend server. All files correctly positioned for static deployment.
- ✅ **DEPLOYMENT ISSUE RESOLVED** (July 2025) - Fixed deployment failures by creating deploy-simple.js script that bypasses build timeouts and creates proper deployment structure with working production server on port 5000
- ✅ **DEPLOYMENT PREVIEW SCRIPT FIXED** (July 2025) - Resolved "Missing script 'preview' in package.json" error by adding preview script to dist/package.json and using existing deployment infrastructure
- ✅ **DEPLOYMENT CRASH LOOP FIXED** (July 2025) - Fixed deployment failures by updating deploy-simple.js to include both 'start' and 'preview' scripts in dist/package.json, ensuring compatibility with Replit's deployment system
- ✅ **GITHUB PAGES DEPLOYMENT FIXED** (July 2025) - Fixed 404 error by correcting GitHub Actions workflow to upload from ./dist instead of ./dist/public, and ensured proper React build files are in dist/ directory with matching assets

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and scroll animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot module reloading with Vite integration

## Key Components

### Frontend Structure
- **Pages**: Home page with multiple sections (Hero, Academic, Projects, Experience, Personal, Contact)
- **Components**: Modular section components with reusable UI elements
- **Styling**: Dark/light theme support with CSS custom properties
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Backend Structure
- **API Routes**: RESTful endpoints prefixed with `/api`
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Comprehensive logging for API requests

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Schema Validation**: Zod integration for type-safe database operations
- **Migration System**: Drizzle Kit for database schema management

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Typed responses ensure type safety across the stack
5. **State Management**: TanStack Query caches and manages server state

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Lucide React**: Icon library

### Backend Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database toolkit
- **Express**: Web application framework

### Development Tools
- **TypeScript**: Static type checking
- **Vite**: Fast build tool and development server
- **ESBuild**: JavaScript bundler for production builds

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database Migration**: Drizzle pushes schema changes to PostgreSQL

### Environment Configuration
- **Development**: Local development with hot reloading
- **Production**: Node.js server serving static files and API routes
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Scripts
- `dev`: Start development server with hot reloading
- `build`: Build both frontend and backend for production
- `start`: Run production server
- `db:push`: Apply database schema changes

### Deployment Fix Scripts
- `deploy-simple.js`: **CURRENT SOLUTION** - bypasses build timeouts and creates working deployment structure with production server
- `verify-deployment-ready.js`: Verifies deployment readiness and provides status summary
- `fix-deployment-structure.js`: **Primary solution** - comprehensive deployment fix with error handling and verification
- `deploy.js`: Complete build + deployment process in one command with full cleanup and verification
- `quick-deploy-fix.js`: Simple and user-friendly deployment fix with clear feedback
- `scripts/build.js`: Complete build process with file restructuring for deployment
- `scripts/post-build.js`: Standalone script to copy files from dist/public to dist
- `deploy-build.js`: Simple deployment build script that handles file restructuring
- `fix-deployment.js`: Quick fix script to run after build to restructure files

### Hosting Considerations
- **Static Assets**: Built to `dist/public` but copied to `dist` for deployment
- **API Routes**: Handled by Express server
- **Database**: Neon Database provides serverless PostgreSQL
- **Session Storage**: PostgreSQL-based session management for scalability
- **Deployment Fix**: Post-build scripts ensure files are in correct location for static deployment

## Deployment Fix Instructions

### The Problem
Static deployment fails because:
- Build outputs files to `dist/public/` directory
- Deployment expects `index.html` and assets in `dist/` directory
- Core configuration files cannot be modified

### Solution Commands
Run one of these commands before deployment:

```bash
# Option 1: CURRENT SOLUTION - Simple deployment (Recommended)
node deploy-simple.js

# Option 2: Verify deployment readiness
node verify-deployment-ready.js

# Option 3: Comprehensive deployment fix (if build works)
npm run build && node fix-deployment-structure.js

# Option 4: Complete automated deployment
node deploy.js

# Option 5: Quick and user-friendly fix
npm run build && node quick-deploy-fix.js
```

### What the Fix Does
1. Builds the application normally
2. Copies all files from `dist/public/` to `dist/` 
3. Ensures `index.html` and `assets/` are in root `dist/` directory
4. Preserves original file structure for compatibility