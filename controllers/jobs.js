const getAllJobs = async (req, res) => {
    res.send('Getting all jobs');
}

const getJob = async (req, res) => {
    res.send('Getting job');
}

const createJob = async (req, res) => {
    res.json(req.user);
}

const updateJob = async (req, res) => {
    res.send('Updating job');
}

const deleteJob = async (req, res) => {
    res.send('Deleting job');
}

module.exports = {
    deleteJob,
    updateJob,
    createJob,
    getJob,
    getAllJobs,
}