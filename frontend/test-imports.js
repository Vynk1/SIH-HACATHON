// Test file to check if all components can be imported without errors
import React from 'react';

// Test importing all main components
try {
  console.log('Testing component imports...');
  
  // These imports should work if components are syntactically correct
  import('./src/pages/AdminDash.jsx')
    .then(() => console.log('✓ AdminDash.jsx imports successfully'))
    .catch(err => console.error('✗ AdminDash.jsx import failed:', err.message));
    
  import('./src/pages/StudentDash.jsx')
    .then(() => console.log('✓ StudentDash.jsx imports successfully'))
    .catch(err => console.error('✗ StudentDash.jsx import failed:', err.message));
    
  import('./src/pages/AlumniDash.jsx')
    .then(() => console.log('✓ AlumniDash.jsx imports successfully'))
    .catch(err => console.error('✗ AlumniDash.jsx import failed:', err.message));
    
  import('./src/App.jsx')
    .then(() => console.log('✓ App.jsx imports successfully'))
    .catch(err => console.error('✗ App.jsx import failed:', err.message));
    
  import('./src/config/api.js')
    .then(() => console.log('✓ api.js imports successfully'))
    .catch(err => console.error('✗ api.js import failed:', err.message));

  console.log('Import tests completed!');
} catch (error) {
  console.error('Error during import testing:', error.message);
}
