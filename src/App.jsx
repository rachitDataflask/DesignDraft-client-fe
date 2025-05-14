import { Routes, Route, Navigate } from "react-router-dom";
import FireFightPage from "./pages/FireFightPage";
import ElectricalPage from "./pages/ElectricalPage";
import PlumbingPage from "./pages/PlumbingPage";
import FileSetupPage from "./pages/FileSetupPage";
import HVACPage from "./pages/HVACPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DraftSideBar from "./components/DesginDraft/DraftSideBar";
import Home from "./components/DesginDraft/Home";
import DesignCalculation from "./components/DesginDraft/DesignCalculation";
// import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/design-calculation" element={<DesignCalculation />} />
      <Route path="/draft-sidebar" element={<DraftSideBar />} />

      <Route path="/file-setup" element={<FileSetupPage />} />
      <Route path="/hvac" element={<HVACPage />} />
      <Route path="/fire-fight" element={<FireFightPage />} />
      <Route path="/electrical" element={<ElectricalPage />} />
      <Route path="/plumbing" element={<PlumbingPage />} />
    </Routes>
  );
}
export default App;
