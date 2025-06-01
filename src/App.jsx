import { Routes, Route, Navigate } from "react-router-dom";
import FireFightPage from "./pages/FireFightPage";
import ElectricalPage from "./pages/ElectricalPage";
import PlumbingPage from "./pages/PlumbingPage";
import FileSetupPage from "./pages/FileSetupPage";
import HVACPage from "./pages/HVACPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DraftSideBar from "./components/shared/DraftSideBar";
import Home from "./components/designCalculation/Home";
import DesignCalculation from "./components/designCalculation/DesignCalculation";
import ExtractQuantity from "./components/extractQuantity/ExtractQuantity";
import QuantityExtraction from "./components/extractQuantity/QuantityExtraction";

function PrivateRoute({ children }) {
  // Check if the token exists in localStorage
  const token = localStorage.getItem("token");

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (protected route)
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/design-calculation"
        element={
          <PrivateRoute>
            <DesignCalculation />
          </PrivateRoute>
        }
      />
       <Route
        path="/extract-quantity"
        element={
          <PrivateRoute>
            <ExtractQuantity />
          </PrivateRoute>
        }
      />
       <Route
        path="/quantity-extraction"
        element={
          <PrivateRoute>
            <QuantityExtraction />
          </PrivateRoute>
        }
      />
      <Route
        path="/quantity-extraction/:projectId"
        element={
          <PrivateRoute>
            <QuantityExtraction />
          </PrivateRoute>
        }
      />
      <Route
        path="/file-setup"
        element={
          <PrivateRoute>
            <FileSetupPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/file-setup/:projectId"
        element={
          <PrivateRoute>
            <FileSetupPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/hvac"
        element={
          <PrivateRoute>
            <HVACPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/fire-fight"
        element={
          <PrivateRoute>
            <FireFightPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/electrical"
        element={
          <PrivateRoute>
            <ElectricalPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/plumbing"
        element={
          <PrivateRoute>
            <PlumbingPage />
          </PrivateRoute>
        }
      />
      
    </Routes>
  );
}

export default App;
