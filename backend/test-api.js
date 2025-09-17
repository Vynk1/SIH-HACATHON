// Test API endpoints with Node.js fetch
const testAPI = async () => {
  console.log('🔍 Testing API endpoints...\n');
  
  const endpoints = [
    { url: 'http://localhost:5000/', method: 'GET' },
    { url: 'http://localhost:5000/jobs', method: 'GET' },
    { url: 'http://localhost:5000/jobs', method: 'POST', body: { title: 'Test Job', company: 'Test Corp', location: 'Remote', applyLink: 'https://test.com' } }
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.method} ${endpoint.url}`);
      
      const options = {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      if (endpoint.body) {
        options.body = JSON.stringify(endpoint.body);
      }
      
      const response = await fetch(endpoint.url, options);
      const contentType = response.headers.get('content-type');
      
      console.log(`  Status: ${response.status} ${response.statusText}`);
      console.log(`  Content-Type: ${contentType}`);
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log(`  Response: ${JSON.stringify(data, null, 2)}`);
      } else {
        const text = await response.text();
        console.log(`  Response: ${text.substring(0, 200)}${text.length > 200 ? '...' : ''}`);
      }
      
      console.log('');
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}\n`);
    }
  }
};

// For older Node versions that don't have fetch
if (typeof fetch === 'undefined') {
  console.log('Installing node-fetch for older Node versions...');
  try {
    const fetch = require('node-fetch');
    global.fetch = fetch;
  } catch (e) {
    console.log('node-fetch not available, using http module...');
    const http = require('http');
    
    global.fetch = (url, options = {}) => {
      return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const reqOptions = {
          hostname: urlObj.hostname,
          port: urlObj.port,
          path: urlObj.pathname,
          method: options.method || 'GET',
          headers: options.headers || {}
        };
        
        const req = http.request(reqOptions, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            resolve({
              status: res.statusCode,
              statusText: res.statusMessage,
              headers: { get: (name) => res.headers[name.toLowerCase()] },
              json: () => Promise.resolve(JSON.parse(data)),
              text: () => Promise.resolve(data)
            });
          });
        });
        
        req.on('error', reject);
        
        if (options.body) {
          req.write(options.body);
        }
        
        req.end();
      });
    };
  }
}

testAPI();
