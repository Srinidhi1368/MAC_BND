const { savedJobCollection, appliedJobCollection } = require("../model/MyJob.model");
const jobCollection = require("../model/Job.Model");
const User = require("../model/users/UserModel");

const createAppliedJob = async (req, res) => {
    try {
        const { _id, email, jobTitle, employeeEmail, jobPoster, jobDescription, employmentType, location, salaryRange, skilRequired, jobExperience, createdAt } = req.body;

        // Current USER
        const mongooseUser = await User.findOne({ email: email });

        // add the applied job appliedjobCollection
        const mongooseResponse = await appliedJobCollection.create({
            jobID: _id, jobTitle: jobTitle, jobPoster: jobPoster, jobDescription: jobDescription, employmentType: employmentType, location: location, salaryRange: salaryRange, skilRequired: skilRequired, employeeEmail: employeeEmail, jobExperience: jobExperience, createdAt: createdAt, userEmail: email
        });

        // update the jobo collection applicationCount by 1 and also update the applidBy data in collection with user emailID everytime any user applied for jobs
        const updateJobCollection = await jobCollection.updateOne({ _id }, {
            $push: { appliedBy: { userEmail: email } },
            $inc: { totalApplication: 1 },
        });


        if (mongooseResponse && updateJobCollection.acknowledged) {
            await savedJobCollection.findOneAndDelete({
                jobID: _id,
                userEmail: email,
            });
            await User.updateOne({ email }, {
                $push: { userAppliedJob: { jobID: _id } },
                userSavedJob: mongooseUser.userSavedJob.filter((data) => data.jobID !== _id)
            });
            res.status(200).json({
                success: true,
                msg: "Job applied Successfully",
            });
        } else {
            res.status(400).json({
                success: false,
                msg: "Try again"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }

}

const getAppliedJob = async (req, res) => {
    try {
        const mongooseResponse = await appliedJobCollection.find({ userEmail: req.params.email })
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                appliedJob: mongooseResponse
            })
        } else {
            res.status(404).json({
                success: false,
                appliedJob: mongooseResponse
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }
}

const removeAppliedJob = async (req, res) => {
    try {
        const [email, jobId] = req.params.email.split("-")
        const mongooseResponse = await appliedJobCollection.findOneAndDelete({
            jobID: jobId,
            userEmail: email,
        });
        await User.updateOne({ email }, {
            userSavedJob: mongooseUser.userSavedJob.filter((data) => data.jobID !== jobId)
        });
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                msg: "Remove from saved collection successfull"
            })
        } else {
            res.status(404).json({
                success: false,
                msg: "Job not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }
}


//! Saved job related controllers
const createSavedJob = async (req, res) => {
    try {
        const { _id, email, jobTitle, employeeEmail, jobPoster, jobDescription, employmentType, location, salaryRange, skilRequired, jobExperience, createdAt } = req.body;
        const mongooseResponse = await savedJobCollection.create({
            jobID: _id,
            jobTitle: jobTitle,
            jobPoster: jobPoster,
            jobDescription: jobDescription,
            employmentType: employmentType,
            location: location,
            salaryRange: salaryRange,
            skilRequired: skilRequired,
            employeeEmail: employeeEmail,
            jobExperience: jobExperience,
            createdAt: createdAt,
            userEmail: email
        });
        if (mongooseResponse) {
            await User.updateOne({ email }, {
                $push: { userSavedJob: { jobID: _id } },
            });
            res.status(200).json({
                success: true,
                msg: "Job saved Successfully",
            })
        } else {
            res.status(400).json({
                success: false,
                msg: "Try again"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }
}

const getSavedJob = async (req, res) => {
    try {
        const mongooseResponse = await savedJobCollection.find({ userEmail: req.params.email })
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                savedJob: mongooseResponse
            })
        } else {
            res.status(404).json({
                success: false,
                savedJob: mongooseResponse
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }
}

const removeSavedJob = async (req, res) => {
    try {
        const [email, jobId] = req.params.email.split("-")
        const mongooseResponse = await savedJobCollection.findOneAndDelete({
            jobID: jobId,
            userEmail: email,
        });
        const mongooseUser = await User.findOne({ email: email });
        
        await User.updateOne({ email }, {
            userSavedJob: mongooseUser.userSavedJob.filter((data) => data.jobID !== jobId)
        });
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                msg: "Remove from saved collection successfull"
            })
        } else {
            res.status(404).json({
                success: false,
                msg: "Job not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }
}


module.exports = {
    createAppliedJob,
    getAppliedJob,
    removeAppliedJob,
    createSavedJob,
    getSavedJob,
    removeSavedJob,
}