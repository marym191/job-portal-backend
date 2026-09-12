const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;