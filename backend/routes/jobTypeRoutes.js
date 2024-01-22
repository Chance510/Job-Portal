const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createJobType, allJobTypes, updateJobTypes, deleteJobType } = require('../controllers/jobTypeController');


//jobType routes
// /api/type/create
router.post('/type/create', isAuthenticated, isAdmin, createJobType)
// /api/type/jobs
router.get('/type/jobs', allJobTypes)
// /api/type/update/:type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateJobTypes);
// /api/type/delete/:type_id
router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteJobType);

module.exports = router;