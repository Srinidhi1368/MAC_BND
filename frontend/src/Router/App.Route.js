import React from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//! These All Files are imported for the JobSEEker Routes
const JobSeekerLayout = lazy(() =>
  import("../pages/Job_Seeker/JobSeekerLayout")
);
const Dashboard = lazy(() =>
  import("../pages/Job_Seeker/Dashboard/Dashboard.js")
);
const Assessment = lazy(() =>
  import("../pages/Job_Seeker/Assessment/Assessment.js")
);
const InstructionPage = lazy(() =>
  import("../pages/Job_Seeker/Assessment/InstructionPage.js")
);
const SelfAssessmentPage = lazy(() =>
  import("../pages/Job_Seeker/Assessment/SelfAssessmentPage.js")
);
const AssessmentResult = lazy(() =>
  import("../pages/Job_Seeker/Assessment/AssessmentResult.js")
);
const ChatBot = lazy(() => import("../pages/Job_Seeker/Chatbot/ChatBot.js"));
const Analytics = lazy(() =>
  import("../pages/Job_Seeker/Analysis/Analysis.js")
);
const MYJobs = lazy(() => import("../pages/Job_Seeker/MyJobs/MyJobs.js"));
const MYResume = lazy(() => import("../pages/Job_Seeker/MyResume/MyResume.js"));
const Application = lazy(() =>
  import("../pages/Job_Seeker/ApplicationStatus/ApplicationStatus.js")
);
const Interviews = lazy(() =>
  import("../pages/Job_Seeker/InterviewScheduled/Interview.js")
);
const Settings = lazy(() => import("../pages/Job_Seeker/Settings/Setting.js"));

const JobListDetailedView = lazy(() =>
  import("../pages/Job_Seeker/Dashboard/DetailedView.js")
);

//! These All Files are imported for the JobSEEker Routes

function AppRoute() {
  return (
    <>
      <JobSeekerRoutes />
    </>
  );
}

export default AppRoute;

// All Routing related to the JOB SEEKERS must be defined HERE
function JobSeekerRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            <JobSeekerLayout />
          </Suspense>
        }
      >
        <Route
          path="/dashboard"
          element={
            <Suspense>
              <Dashboard />
            </Suspense>
          }
        />

        <Route
          path="/assessment"
          element={
            <Suspense>
              <Assessment />
            </Suspense>
          }
        />

        <Route
          path="/chatbot"
          element={
            <Suspense>
              <ChatBot />
            </Suspense>
          }
        />

        <Route
          path="/analytics"
          element={
            <Suspense>
              <Analytics />
            </Suspense>
          }
        />
        <Route
          path="/myjobs"
          element={
            <Suspense>
              <MYJobs />
            </Suspense>
          }
        />
        <Route
          path="/myresume"
          element={
            <Suspense>
              <MYResume />
            </Suspense>
          }
        />
        <Route
          path="/application"
          element={
            <Suspense>
              <Application />
            </Suspense>
          }
        />
        <Route
          path="/interviews"
          element={
            <Suspense>
              <Interviews />
            </Suspense>
          }
        />
        <Route
          path="/settings"
          element={
            <Suspense>
              <Settings />
            </Suspense>
          }
        />

        <Route
          path="/job/:id"
          element={
            <Suspense>
              <JobListDetailedView />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="/assessment-Instructions"
        element={
          <Suspense>
            <InstructionPage />
          </Suspense>
        }
      />

      <Route
        path="/assessment-test"
        element={
          <Suspense>
            <SelfAssessmentPage />
          </Suspense>
        }
      />

      <Route
        path="/assessment-result"
        element={
          <Suspense>
            <AssessmentResult />
          </Suspense>
        }
      />
    </Routes>
  );
}
