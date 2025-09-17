# Manual Testing Guide - Jobs & Achievements Integration

This document provides comprehensive manual testing steps for the newly integrated Jobs and Achievements features in the Alumni Connect platform.

## Prerequisites

### Environment Setup
1. Ensure MongoDB is running
2. Backend server running on `http://localhost:3000`
3. Frontend server running on `http://localhost:5173` (or 5174)
4. Test user accounts available:
   - Alumni account with completed profile
   - Student account with basic information

### Database State
- Clean state with no existing jobs or achievements (optional)
- At least one alumni and one student account created

## Test Scenarios

### 🎯 **Test Case 1: Alumni Job Posting Flow**

#### **Step 1.1: Alumni Login and Navigation**
1. Navigate to `http://localhost:5173/login`
2. Log in with alumni credentials
3. Verify redirect to Alumni Dashboard (`/alumnidash`)
4. Click on "Jobs" navigation item or use quick action "Post Job"
5. Verify navigation to Jobs Board (`/jobs`)

**Expected Result**: 
- Successful login and navigation
- Alumni sees "Post Job" button in Jobs Board
- Clean, responsive job board interface

#### **Step 1.2: Create New Job Posting**
1. Click "Post Job" button
2. Fill out the job form:
   - **Title**: "Senior Software Engineer"
   - **Company**: "Tech Corp Inc."
   - **Location**: "San Francisco, CA"
   - **Job Type**: "Full-time"
   - **Apply Link**: "https://example.com/apply"
   - **Description**: "Looking for an experienced developer..."
   - **Experience**: "3-5 years"
   - **Salary**: "$120k-$150k"
3. Click "Post Job"

**Expected Result**: 
- Form validation works correctly
- Success message appears
- Job appears in the jobs list
- Modal closes automatically

#### **Step 1.3: Edit Job Posting**
1. Locate the posted job in the jobs list
2. Click "Edit" button (should only appear for job owner)
3. Modify job details (e.g., change salary to "$130k-$160k")
4. Click "Update Job"

**Expected Result**: 
- Edit modal opens with pre-filled data
- Changes are saved successfully
- Updated job reflects new information

#### **Step 1.4: Delete Job Posting**
1. Click "Delete" button on the job
2. Confirm deletion in the dialog
3. Verify job is removed from the list

**Expected Result**: 
- Confirmation dialog appears
- Job is soft-deleted (isActive = false)
- Job no longer appears in public listings

---

### 🎓 **Test Case 2: Student Job Application Flow**

#### **Step 2.1: Student Login and Job Discovery**
1. Log out from alumni account
2. Log in with student credentials
3. Navigate to Jobs Board (`/jobs`)
4. Browse available job listings

**Expected Result**: 
- Student sees all active job postings
- No "Post Job" button visible (alumni only)
- Job cards display with "Apply Now" buttons

#### **Step 2.2: Apply for Job**
1. Click "Apply Now" on a job posting
2. Verify application is recorded
3. Check that button changes to "Applied"
4. Try to apply again (should be prevented)

**Expected Result**: 
- Application is recorded in backend
- External apply link opens in new tab
- Button state changes to "Applied"
- Duplicate applications are prevented

#### **Step 2.3: Test Job Filtering**
1. Use search bar to search for "Engineer"
2. Filter by job type "Full-time"
3. Filter by location "San Francisco"
4. Clear filters and verify all jobs return

**Expected Result**: 
- Search functionality works across title, company, description
- Filters work independently and in combination
- Results update dynamically

---

### 🏆 **Test Case 3: Alumni Achievement Management**

#### **Step 3.1: Achievement Creation**
1. Log in as alumni
2. Go to Alumni Dashboard → Achievements tab
3. Click "Add Achievement"
4. Fill out achievement form:
   - **Title**: "Employee of the Year 2023"
   - **Category**: "Award"
   - **Organization**: "Google Inc."
   - **Date**: "2023-12-15"
   - **Description**: "Recognized for outstanding performance..."
   - **Link**: "https://company.com/awards"
   - **Image URL**: "https://example.com/award.jpg"
5. Submit the form

**Expected Result**: 
- Modal opens with clean form
- Form validation works
- Success message appears
- Achievement appears in personal dashboard

#### **Step 3.2: Achievement Visibility Toggle**
1. In the Achievements tab, locate the created achievement
2. Click "Make Private" to hide from public view
3. Verify visibility status changes
4. Click "Make Public" to show in Hall of Fame

**Expected Result**: 
- Visibility toggle works correctly
- Public/Private status is clearly indicated
- Changes are saved immediately

#### **Step 3.3: Edit Achievement**
1. Click "Edit" on an achievement
2. Modify details (e.g., update description)
3. Save changes

**Expected Result**: 
- Edit modal pre-fills with existing data
- Changes are saved successfully
- Updated achievement reflects changes

---

### 🌟 **Test Case 4: Hall of Fame Public View**

#### **Step 4.1: Public Achievement Display**
1. Navigate to Hall of Fame (`/hall-of-fame`)
2. Verify all public achievements are displayed
3. Test category filtering (Awards, Publications, etc.)
4. Test year filtering
5. Use search functionality

**Expected Result**: 
- Only public achievements are visible
- Achievements display with alumni info
- Filtering and search work correctly
- Stats overview shows correct counts

#### **Step 4.2: Achievement Categories**
1. Test each category filter:
   - Awards
   - Publications
   - Startups
   - Recognition
   - Certifications
2. Verify category counts in stats section

**Expected Result**: 
- Category filtering works accurately
- Stats update based on visible achievements
- Category icons display correctly

---

### 🔧 **Test Case 5: API and Error Handling**

#### **Step 5.1: Network Error Scenarios**
1. Stop the backend server
2. Try to create a job or achievement
3. Verify error messages are displayed
4. Restart server and retry

**Expected Result**: 
- Appropriate error messages displayed
- No crashes or blank screens
- Graceful degradation of functionality

#### **Step 5.2: Authentication Testing**
1. Access `/jobs` without logging in
2. Try to post a job as a student
3. Try to access achievement management as a student

**Expected Result**: 
- Proper authentication redirects
- Authorization checks prevent unauthorized actions
- Clear error messages for access denied scenarios

#### **Step 5.3: Form Validation**
1. Try submitting job form with missing required fields
2. Try submitting achievement form with invalid data
3. Test URL validation for links

**Expected Result**: 
- Client-side validation prevents submission
- Server-side validation provides feedback
- User-friendly error messages

---

### 📱 **Test Case 6: Responsive Design**

#### **Step 6.1: Mobile View Testing**
1. Open browser developer tools
2. Switch to mobile device simulation
3. Test all new pages:
   - Jobs Board
   - Hall of Fame  
   - Achievement modals
4. Verify touch interactions work

**Expected Result**: 
- All layouts are responsive
- Modals are mobile-friendly
- Touch interactions work smoothly
- Text and buttons are appropriately sized

#### **Step 6.2: Tablet View Testing**
1. Test tablet viewport (768px - 1024px)
2. Verify grid layouts adapt correctly
3. Check that all functionality remains accessible

**Expected Result**: 
- Grid layouts optimize for tablet screens
- Navigation remains intuitive
- No horizontal scrolling issues

---

### 🔄 **Test Case 7: Integration with Existing Features**

#### **Step 7.1: Dashboard Integration**
1. Verify Alumni Dashboard shows achievement count in stats
2. Check that job-related metrics appear if implemented
3. Ensure existing features (donations, events, mentorship) still work

**Expected Result**: 
- New features integrate seamlessly
- Existing functionality remains unaffected
- Dashboard stats include achievement data

#### **Step 7.2: Navigation and Routing**
1. Test all navigation between pages
2. Verify browser back/forward buttons work
3. Test direct URL access to all new routes

**Expected Result**: 
- All routes work correctly
- No broken navigation flows  
- Deep linking works for all pages

---

## Expected Test Results Summary

### ✅ **Success Criteria**
- [ ] Alumni can create, edit, and delete job postings
- [ ] Students can view and apply for jobs
- [ ] Job filtering and search work correctly
- [ ] Alumni can manage achievements with CRUD operations
- [ ] Achievement visibility toggle works
- [ ] Hall of Fame displays public achievements correctly
- [ ] All forms have proper validation
- [ ] Responsive design works on all device sizes
- [ ] Authentication and authorization work correctly
- [ ] Integration with existing features is seamless

### 🚨 **Known Issues to Watch For**
- API timeout handling
- Large dataset pagination performance
- Image upload/display for achievements
- Email notifications (if implemented)
- Cache invalidation for updated data

### 📊 **Performance Benchmarks**
- Job listings should load within 2 seconds
- Achievement creation should complete within 1 second
- Search results should appear within 500ms
- Modal animations should be smooth (no lag)

## Automated Testing Notes

### Backend API Tests
```bash
# Run existing backend tests
npm test

# Test specific endpoints
npm run test:jobs
npm run test:achievements
```

### Frontend Component Tests
```bash
# Run component tests
npm run test:frontend

# Test specific components
npm test -- --grep "JobCard"
npm test -- --grep "AchievementCard"
```

## Post-Integration Checklist

- [ ] All manual tests pass
- [ ] Backend API tests pass
- [ ] Frontend component tests pass
- [ ] No console errors in browser
- [ ] Database indexes are optimized
- [ ] Error logging is working
- [ ] Performance is acceptable
- [ ] Security review completed
- [ ] Documentation is updated

---

**Testing completed by**: _[Tester Name]_  
**Date**: _[Test Date]_  
**Environment**: _[Test Environment Details]_  
**Notes**: _[Additional observations or issues found]_