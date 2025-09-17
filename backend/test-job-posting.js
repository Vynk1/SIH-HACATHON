// Quick test to verify job posting is working
// Run this with: node test-job-posting.js

const testJobPosting = () => {
  console.log('🔧 Testing Job Posting Setup...\n');

  // Check if required modules exist
  try {
    const jobController = require('./controller/job.controller');
    console.log('✅ Job controller loaded successfully');
    
    const jobRoutes = require('./routes/job.route');
    console.log('✅ Job routes loaded successfully');
    
    const jobModel = require('./model/job.model');
    console.log('✅ Job model loaded successfully');
    
    // Check if all required functions exist in controller
    const requiredMethods = ['createJob', 'getAllJobs', 'getMyJobs', 'updateJob', 'deleteJob'];
    requiredMethods.forEach(method => {
      if (typeof jobController[method] === 'function') {
        console.log(`✅ ${method} method exists`);
      } else {
        console.log(`❌ ${method} method missing`);
      }
    });

    console.log('\n📋 Job posting should work with the following API endpoints:');
    console.log('   POST /jobs - Create new job posting (Alumni only)');
    console.log('   GET /jobs - Get all active jobs');
    console.log('   GET /jobs/my/jobs - Get user\'s job postings');
    console.log('   PUT /jobs/:jobId - Update job posting');
    console.log('   DELETE /jobs/:jobId - Delete job posting');

    console.log('\n🎯 Required fields for job posting:');
    console.log('   - title (required)');
    console.log('   - company (required)');
    console.log('   - location (required)');
    console.log('   - applyLink (required)');
    console.log('   - description (optional)');
    console.log('   - jobType (optional, defaults to "full-time")');
    console.log('   - experience (optional)');
    console.log('   - salary (optional)');

    console.log('\n💡 If job posting is still not working, check:');
    console.log('   1. User authentication token is valid');
    console.log('   2. User role is "alumni"');
    console.log('   3. Backend server is running and accessible');
    console.log('   4. MongoDB connection is working');
    console.log('   5. CORS is properly configured for frontend');
    console.log('   6. All required fields are filled in the form');

  } catch (error) {
    console.error('❌ Error loading job posting components:', error.message);
  }
};

// Run the test
testJobPosting();
