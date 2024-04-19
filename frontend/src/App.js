import Candidate from "./pages/Employer/Candidates/Temp_Condidate/Candidate";
import ApplicationStatus from "./pages/Job_Seeker/ApplicationStatus/ApplicationStatus";
import YourApplicationStatus from "./pages/Job_Seeker/ApplicationStatus/ApplicationStatusPopUp/YourApplicationStatus";
import AppRoute from "./Router/App.Route";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      {/* <Toaster position="top-center" reverseOrder={false} />
      <AppRoute /> */}
      {/* <ApplicationStatus/> */}
      {/* <YourApplicationStatus/> */}
      <Candidate/>
    </>
  )
}

export default App;
