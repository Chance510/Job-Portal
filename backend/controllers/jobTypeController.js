const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create job category
exports.createJobType = async(req, res, next) => {
    console.log(`Entered createJobTypes`)
    try {
        const job = await JobType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

//all jobs category
exports.allJobTypes = async(req, res, next) => {
    try {
        console.log(`Entered allJobTypes`)
        const jobs = await JobType.find();
        res.status(200).json({
            success: true,
            jobs
        })
    } catch (error) {
        next(error);
    }
}

//update jobs category
exports.updateJobTypes = async(req, res, next) => {
    try {
        console.log(`Entered updateJobTypes`)
        const jobs = await JobType.findByIdAndUpdate(req.params.type_id, req.body, {new: true});
        res.status(200).json({
            success: true,
            jobs
        })
    } catch (error) {
        next(error);
    }
}

//Delete Job Type
exports.deleteJobType = async(req, res, next) => {
    try {
        console.log(`Entered deleteJobTypes`)
        const jobs = await JobType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            jobs
        })
    } catch (error) {
        next(new ErrorResponse('Server Error', 500));
    }
}