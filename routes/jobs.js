const express = require('express');
const router = express.Router();

const {
    deleteJob,
    updateJob,
    createJob,
    getJob,
    getAllJobs,
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;