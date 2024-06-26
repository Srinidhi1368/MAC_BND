const express = require("express");
const ConnectDb = require("./Config/config.js");
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
const { assessmentRoute } = require("./Routes/Assessment.Route");
const assesmentQuestionRouter = require("./Routes/AssessmentQuestion.Route");
app.use("/api/assessment", assessmentRoute);
app.use("/api/questions", assesmentQuestionRouter);

//!  Auth Related  Routes and import
const userRoutes = require("./Routes/UserRoutes");
app.use("/api", userRoutes);

const HrRoutes = require("./Routes/HrRoutes");
app.use("/api/hr", HrRoutes);

//! Interview Schedule Related Routes and import
const AptitudeQuestionRouter = require("./Routes/InterviewScheduleRoutes/AptitudeRoundRoute");
app.use("/api/aptitude", AptitudeQuestionRouter);

//!  JObs (HR) Related  Routes and import
const jobRoutes = require("./Routes/Job.Route");
app.use("/api/jobs", jobRoutes);

// Resume Routes
const ResumeRoutes = require("./Routes/ResumeRoutes.js");
app.use("/resume", ResumeRoutes);
app.use("/uploads", express.static("uploads"));

//!  MyJobs (JobSeeker) Related  Routes and import
const myJobRoutes = require("./Routes/MyJob.Route");
app.use("/api/user/My-jobs", myJobRoutes);


// !Bookmarked Routes
const { bookmarkRoutes } = require("./Routes/Bookmark.Route.js");
app.use("/api/user/bookmarkd", bookmarkRoutes)

// ! Notifications Route
const {notificationRoutes} = require("./Routes/Notification.Route.js");
app.use("/api/user/notifications", notificationRoutes)

const Port = process.env.PORT;


// Socket IO 
const httpServer = require('http').createServer(app);
const connectedUser = []
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  }
})
io.on("connection", (socket) => {
  socket.on("userConnect", (data) => {
    const user = connectedUser?.find(user => user.email === JSON.parse(data).userEmail);
    if (user) {
      user.socketId = socket.id;
    } else {
      connectedUser.push({ email: JSON.parse(data).userEmail, socketId: socket.id });
    }
    // console.log(connectedUser)
  })


  socket.on("HrSendNotification", (data) => {
    const currentSocketID = connectedUser.filter(user => user.email === JSON.parse(data).userEmail)[0]?.socketId;

    if (currentSocketID) {
      io.to(currentSocketID).emit("receiveNotification", data)
    }
  });


  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // });
})

httpServer.listen(Port, async () => {
  try {
    await ConnectDb();
    console.log(`SERVER STARED  : http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.log(`SOMETHING WENT WRONG : ${err}`);
  }
});
