const jobCollection = require("../model/Job.Model");

const create = async (req, res) => {
  // ! Saptarsi will made this one API for creating job post
};

const get = async (req, res) => {
  try {
    const jobs = await jobCollection.findById(req.params.id);

    if (jobs) {
      res.status(200).send({ jobs, success: true });
    } else {
      res.status(404).send({ jobs: "No job found", success: false });

    }
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

const getAll = async (req, res) => {
  try {
    const mongooseResponse = await jobCollection.find({});

    if (mongooseResponse.length === 0) {

      res.status(404).send({ job: "No job found", success: false });
    } else {
      res.status(200).send({ jobs: mongooseResponse, success: true });
    }
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

const update = async (req, res) => {
  try {
    const data = await jobCollection.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );

    res.status(200).send({ job: data, success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

const remove = async (req, res) => {

  try {
    const data = await jobCollection.findByIdAndDelete(req.params.id);

    if (data) {

      res.status(200).send({ job: data, success: true });
    } else {
      res.status(404).send({ job: "No job found", success: false });

    }
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

module.exports = {
  create,
  get,
  update,
  remove,
  getAll,
};
