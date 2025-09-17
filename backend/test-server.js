// Quick test to check if server is accessible
// Run this with: node test-server.js

const http = require('http');

const testEndpoints = [
  'http://localhost:3000/',
  'http://localhost:3000/jobs',
  'http://localhost:5000/',
  'http://localhost:5000/jobs'
];

const testEndpoint = (url) => {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          headers: res.headers,
          body: data.substring(0, 200) // First 200 chars
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        url,
        error: error.message
      });
    });
    
    req.setTimeout(5000, () => {
      req.abort();
      resolve({
        url,
        error: 'Request timeout'
      });
    });
  });
};

const runTests = async () => {
  console.log('🔍 Testing Backend Server Connectivity...\n');
  
  for (const endpoint of testEndpoints) {
    const result = await testEndpoint(endpoint);
    
    if (result.error) {
      console.log(`❌ ${result.url} - Error: ${result.error}`);
    } else {
      console.log(`✅ ${result.url} - Status: ${result.status}`);
      if (result.body) {
        console.log(`   Response: ${result.body.replace(/\n/g, ' ')}`);
      }
    }
  }
  
  console.log('\n💡 Troubleshooting Tips:');
  console.log('1. Make sure to start the backend server first:');
  console.log('   cd backend');
  console.log('   npm install');
  console.log('   npm start');
  console.log('   # or: node index.js');
  console.log('');
  console.log('2. Check if MongoDB is running and accessible');
  console.log('3. Verify environment variables in .env file');
  console.log('4. Make sure frontend is pointing to the correct port');
  console.log('   (Backend runs on port 3000 by default)');
};

runTests();
