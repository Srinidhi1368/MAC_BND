const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true,
        },
        employeeEmail: {
            type: String,
            required: true,
        },
        jobPoster: {
            type: String,
            required: true,
        },
        jobDescription: {
            type: String,
            required: true,
        },
        employmentType: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        salaryRange: {
            type: String,
            required: true,
        },
        skilRequired: [
            {
                type: String
            },
        ],
        jobExperience: {
            type: String,
            required: true,
        },
        education:{
            type: String,
            // required: true,
        },
        responsibility:{
            type: String,
            // required: true,
        },
        howToApply:{
            type: String,
            // required: true,
        },
        createdAt: {
            type: Number,
        },
        totalApplication: {
            type: Number,
            default: 0,
        },
        appliedBy: [
            {
                userEmail: {
                    type: String,
                }
            }
        ]
    }

);


const jobCollection = mongoose.model('jobs', jobSchema);

module.exports = jobCollection;
