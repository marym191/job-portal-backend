const Application = require('../models/Application');
const Job = require('../models/job');

const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const newApplication = new Application({
      job: jobId,
      applicant: req.user.id,
    });

    await newApplication.save();

    res.status(201).json({ message: 'Applied successfully', application: newApplication });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id }).populate('job');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getApplicantsForJob = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId }).populate('applicant', 'name email');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { applyToJob, getMyApplications, getApplicantsForJob };