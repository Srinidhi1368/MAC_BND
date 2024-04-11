import React, { useEffect } from "react";
import { lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
//! These All Files are imported for the JobSEEker Routes

//! These All Files are imported for the Auth Routes
const LoginPage = lazy(() =>
  import("../pages/Auth/Login/ToggleLogin/LoginPage")
);
const Signup = lazy(() => import("../pages/Auth/Signup/UserSignup/UserSignup"));
const HrLogin = lazy(() => import("../pages/Auth/Login/HrLogin/HrLogin"));
const ResetPassword = lazy(() =>
  import("../pages/Auth/Password/User/ForgotPassword/ForgotPassword")
);
const ForgotPassword = lazy(() =>
  import("../pages/Auth/Password/User/ResetPassword/ResetPassword")
);
const HrResetPassword = lazy(() =>
  import("../pages/Auth/Password/Hr/ForgotPassword/HrForgotPassword")
);
const HrForgotPassword = lazy(() =>
  import("../pages/Auth/Password/Hr/ResetPassword/HrResetPassword")
);
//! These All Files are imported for the Auth Routes

function AppRoute() {
  // const {pathaname} = useLocation();
  const navigateTO = useNavigate();
  const { token, userType } = useSelector(
    (state) => state.Assessment.currentUser
  );

  useEffect(() => {
    if (!token) {
      navigateTO("/user-login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      {token && userType === "user" && <JobSeekerRoutes />}

      {/* Change the route to Hr Recruiter */}
      {token && userType === "employee" && <JobSeekerRoutes />}
      {!token && !userType && <AuthRouter />}
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

      <Route
        path="/*"
        element={
          <Suspense>
            <JobSeekerLayout />
          </Suspense>
        }
      />
    </Routes>
  );
}

// All Routing related to the Auth must be defined HERE
function AuthRouter() {
  return (
    <Routes>
      <Route
        path="/user-login"
        element={
          <Suspense>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/user-signup"
        element={
          <Suspense>
            <Signup />{" "}
          </Suspense>
        }
      />
      <Route
        path="/hr-login"
        element={
          <Suspense>
            <HrLogin />{" "}
          </Suspense>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <Suspense>
            <ResetPassword />
          </Suspense>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Suspense>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path="/hr/reset-password/:token"
        element={
          <Suspense>
            <HrResetPassword />{" "}
          </Suspense>
        }
      />
      <Route
        path="/hr/forgot-password"
        element={
          <Suspense>
            <HrForgotPassword />
          </Suspense>
        }
      />

      <Route
        path="/*"
        element={
          <Suspense>
            <LoginPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
