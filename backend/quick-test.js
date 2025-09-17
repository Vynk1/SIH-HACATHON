const http = require('http');

console.log('Testing /jobs endpoint...');

http.get('http://localhost:5000/jobs', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers['content-type']);
    console.log('Response:');
    console.log(data);
  });
}).on('error', (e) => {
  console.error('Error:', e.message);
});
