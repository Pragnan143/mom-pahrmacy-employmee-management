import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";
import EmployeeDetailsPage from "./Pages/EmployeeDetailsPage";
import EmployeePage from "./Pages/EmployeePage";
import AuthPage from "./Pages/AuthPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/employee-details" element={<EmployeeDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
