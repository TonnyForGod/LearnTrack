// routes/course.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all courses
router.get('/', courseController.getAllCourses);

// Get single course
router.get('/:id', courseController.getCourseById);

// Create course (lecturer/admin only)
router.post('/', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('lecturer', 'admin'), 
  courseController.createCourse
);

// Update course (instructor/admin only)
router.put('/:id', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('lecturer', 'admin'), 
  courseController.updateCourse
);

// Enroll in course
router.post('/:id/enroll', 
  authMiddleware.protect, 
  courseController.enrollInCourse
);

// Get course progress
router.get('/:id/progress', 
  authMiddleware.protect, 
  courseController.getCourseProgress
);

// Update progress
router.patch('/:id/progress', 
  authMiddleware.protect, 
  courseController.updateProgress
);

module.exports = router;