const Job = require('../models/jobModel');
const jobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create job category
exports.createJob = async(req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            salary: req.body.salary,
            jobType: req.body.jobType,
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

//get single Job
exports.singleJob = async(req, res, next) => {
    console.log('Entered single Job')
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

//update job by id
exports.updateJob = async(req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {new: true})
            .populate('jobType', 'jobTypeName')
            .populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

//show all jobs - pagination and searching
exports.showJobs = async(req, res, next) => {

    //enable search
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i' //removes case-sensitive responses
        }
    } : {}

    //filter jobs by category ids
    let ids = []
    const jobTypeCategory = await jobType.find({}, {_id:1});
    jobTypeCategory.forEach(cat => {
        ids.push(cat._id)
    });
    let categ = req.query.cat ? req.query.cat : ids
    
    //jobs by location
    let locations = []
    const jobByLocation = await Job.find({}, {location: 1})
        //.select('Location');
    jobByLocation.forEach(val => {
        locations.push(val.location);
    })
    let setUniqueLocation = [...new Set(locations)] 
    let filterLocation = req.query.location ? req.query.location : setUniqueLocation

    //Pagination
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1
    const count = await Job.find({...keyword, jobType: categ, location: filterLocation}).countDocuments()
    try {
        const jobs = await Job.find({...keyword, jobType: categ, location: filterLocation})
            .sort({createdAt: -1})
            .skip(pageSize * (page-1))
            .limit(pageSize)
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        })
    } catch (error) {
        console.log(`Error`, error)
        next(error);
    }
}