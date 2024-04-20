const { uploadPhoto } = require("../middleware/fileUploadMiddleware")

const jobRoutes = require("express").Router();

// uploadPhoto()

const { create, get, update, remove, getAll, getJobByID, } = require("../controller/Job.controller");

jobRoutes.post("/create-job", uploadPhoto, create);

jobRoutes.get("/get-job/:email", get);

jobRoutes.get("/job/:id", getJobByID);

jobRoutes.get("/All-jobs", getAll);

jobRoutes.put("/update-job/:id", update);

jobRoutes.delete("/delete-job/:id", remove);

module.exports = jobRoutes;