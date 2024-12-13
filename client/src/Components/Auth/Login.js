import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
// import { UserContext } from '../../Context/UserContext';

const LoginPage = () => {
  // const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (username === "" || password === "") {
      setErrorMessage("Both fields are required.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:5000/user/login", {
        username,
        password,
      });
      const userData=response.data.userData
      // Store the JWT token in localStorage
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(userData));

      console.log(response)      
      // login(userData);
      // Check if the user is an admin
      if (response.data.userData.isAdmin) {
        navigate("/admin"); // Navigate to the Admin page if isAdmin is true
      } else {
        navigate("/employee"); // Navigate to the Employee page if isAdmin is false
      }

      // You can also show a success message or handle other post-login actions here
    } catch (error) {
      setErrorMessage("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
