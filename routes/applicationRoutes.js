const express = require('express');
const router = express.Router();
const { applyToJob, getMyApplications, getApplicantsForJob } = require('../controllers/applicationController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, applyToJob);
router.get('/my', protect, getMyApplications);
router.get('/job/:jobId', protect, getApplicantsForJob);

module.exports = router;