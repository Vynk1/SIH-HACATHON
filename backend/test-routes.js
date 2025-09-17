// Simple test server to check if job routes work
const express = require('express');
const app = express();

// Add basic middleware
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Test server running' });
});

// Try to load and mount job routes
try {
  console.log('Loading job routes...');
  const jobRouter = require('./routes/job.route.js');
  app.use('/jobs', jobRouter);
  console.log('✅ Job routes mounted successfully');
  
  // List all registered routes
  console.log('📋 Available routes:');
  app._router.stack.forEach(layer => {
    if (layer.route) {
      console.log(`   ${Object.keys(layer.route.methods).join(', ').toUpperCase()} ${layer.route.path}`);
    } else if (layer.name === 'router') {
      console.log(`   Router mounted at: ${layer.regexp.source}`);
      layer.handle.stack.forEach(nestedLayer => {
        if (nestedLayer.route) {
          console.log(`     ${Object.keys(nestedLayer.route.methods).join(', ').toUpperCase()} /jobs${nestedLayer.route.path}`);
        }
      });
    }
  });
  
} catch (error) {
  console.error('❌ Error loading job routes:', error.message);
  console.error(error.stack);
}

const PORT = 5001; // Use different port to avoid conflicts
app.listen(PORT, () => {
  console.log(`\n🚀 Test server running on http://localhost:${PORT}`);
  console.log('Test endpoints:');
  console.log(`   GET http://localhost:${PORT}/`);
  console.log(`   GET http://localhost:${PORT}/jobs`);
});
