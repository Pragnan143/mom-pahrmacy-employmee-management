import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";
import EmployeeDetailsPage from "./Pages/EmployeeDetailsPage";
import EmployeePage from "./Pages/EmployeePage";
import AuthPage from "./Pages/AuthPage";
// import ProtectedRoute from './components/ProtectedRoute';
// import { UserProvider } from "./Context/UserContext"; // Ensure the correct path

function App() {
  return (
    
      <div className="App"> 
         <Router>

        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/employee-details/:id" element={<EmployeeDetailsPage />} />
        </Routes>   
         </Router>
      </div>
  );
}

export default App;





