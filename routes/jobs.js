const express = require('express');
const router = express.Router();

const {
    deleteJob,
    updateJob,
    createJob,
    getJob,
    getAllJobs,
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs);  /* 1 */
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;

/********** COMMENTS *********

*** 1: In the Express.js framework, the router.route() method is used to create a chainable route handler for a given URL path. It allows you to define multiple HTTP methods for the same route. When you use router.route('/').post(...).get(...), you are specifying that for the root route ("/"), the route handler defined after .post(...) will handle HTTP POST requests etc...

On the other hand, when you write router.post('/register', register), you are directly specifying the HTTP method and the route handler for the "/register" path. In this case, it's a shortcut to define a route specifically for handling POST requests on the "/register" path.
*/