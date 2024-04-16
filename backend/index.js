const express = require("express");
const ConnectDb = require('./Config/config.js');
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);


//!  Assessments Related  Routes and import
const { assessmentRoute } = require("./routes/Assessment.Route");
const assesmentQuestionRouter = require("./Routes/AssessmentQuestion.Route");
app.use("/api/assessment", assessmentRoute);
app.use("/api/questions", assesmentQuestionRouter);
//!  Assessments Related  Routes and import

//!  Auth Related  Routes and import
const userRoutes = require("./Routes/UserRoutes");
app.use("/api", userRoutes);

const HrRoutes = require("./Routes/HrRoutes");
app.use("/api/hr", HrRoutes);
//!  Auth Related  Routes and import

//! Interview Schedule Related Routes and import
const codingQuestionRouter = require('./Routes/InterviewScheduleRoutes/CodingRoundRoute')
app.use('/api/coding',codingQuestionRouter)

const AptitudeQuestionRouter = require('./Routes/InterviewScheduleRoutes/AptitudeRoundRoute')
app.use('/api/aptitude',AptitudeQuestionRouter)
//! Interview Schedule Related Routes and import

//!  JObs (HR) Related  Routes and import
const jobRoutes = require("./Routes/Job.Route");
app.use("/api/jobs", jobRoutes);
//!  JObs (HR) Related  Routes and import


//!  MyJobs (JobSeeker) Related  Routes and import
const myJobRoutes = require("./Routes/MyJob.Route");
app.use("/api/user/My-jobs", myJobRoutes);
//!  MyJobs (JobSeeker) Related  Routes and import

const Port = process.env.Port;

app.listen(Port, async () => {
  try {
    await ConnectDb();
    console.log(`SERVER STARED  : http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.log(`SOMETHING WENT WRONG : ${err}`);
  }
});
