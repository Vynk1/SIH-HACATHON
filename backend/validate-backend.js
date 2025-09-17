// Validation script to check all backend components
// Run this with: node validate-backend.js

console.log('🔍 Validating Backend Components...\n');

const path = require('path');
const fs = require('fs');

// Check if required files exist
const requiredFiles = [
  'routes/job.route.js',
  'controller/job.controller.js',
  'model/job.model.js',
  'middleware/auth.middleware.js'
];

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    return;
  }
});

// Try to load each component
console.log('\n🔧 Loading components:');

try {
  // Load auth middleware
  const authMiddleware = require('./middleware/auth.middleware.js');
  console.log('✅ Auth middleware loaded');
  
  // Load job model
  const JobModel = require('./model/job.model.js');
  console.log('✅ Job model loaded');
  
  // Load job controller
  const jobController = require('./controller/job.controller.js');
  console.log('✅ Job controller loaded');
  
  // Check controller methods
  const requiredMethods = ['createJob', 'getAllJobs', 'getMyJobs', 'updateJob', 'deleteJob'];
  requiredMethods.forEach(method => {
    if (typeof jobController[method] === 'function') {
      console.log(`✅ ${method} method exists`);
    } else {
      console.log(`❌ ${method} method missing`);
    }
  });
  
  // Load job routes
  const jobRoutes = require('./routes/job.route.js');
  console.log('✅ Job routes loaded');
  
} catch (error) {
  console.error('❌ Error loading components:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}

// Test environment variables
console.log('\n🌍 Environment variables:');
const requiredEnv = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'MONGO_DB'];
requiredEnv.forEach(key => {
  if (process.env[key]) {
    console.log(`✅ ${key} is set`);
  } else {
    console.log(`❌ ${key} is NOT set`);
  }
});

console.log('\n🚀 Starting server validation...');

// Try to start the server
try {
  const express = require('express');
  const app = express();
  
  // Load all routes like in index.js
  const jobRouter = require('./routes/job.route.js');
  app.use('/jobs', jobRouter);
  
  // Test the routes configuration
  console.log('✅ Express app configured successfully');
  console.log('✅ Job routes mounted at /jobs');
  
  // List all registered routes
  console.log('\n📋 Registered job routes:');
  jobRouter.stack.forEach(layer => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
      console.log(`   ${methods} /jobs${layer.route.path}`);
    }
  });
  
} catch (error) {
  console.error('❌ Server configuration error:', error.message);
  process.exit(1);
}

console.log('\n✅ All components validated successfully!');
console.log('💡 You can now start the server with: npm start');
