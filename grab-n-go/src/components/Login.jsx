// src/components/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../Images/login.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);

        // ✅ Store the token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // <-- this line was missing

        const { role, email } = data.user;
        const name = email.split("@")[0];

        if (role === "owner") {
          navigate("/resowner", { state: { ownerName: name } });
        } else {
          navigate("/home");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-3/4 max-w-4xl flex">
        {/* Left Side - Form Section */}
        <div className="w-1/2 p-10">
          <h1 className="text-2xl font-bold text-gray-800">Grab N’ Go</h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-2">
            Welcome Back!
          </h2>
          <p className="text-gray-500">
            Enter your credentials to access your account.
          </p>

          <form className="mt-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 font-medium">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="mr-2"
              />
              <span className="text-gray-600">
                I agree to{" "}
                <button
                  type="button"
                  className="text-red-500 underline focus:outline-none"
                >
                  terms & policy
                </button>
              </span>
            </div>

            <button
              type="submit"
              disabled={!agreeTerms}
              className={`w-full mt-6 py-2 rounded-md text-lg font-semibold transition ${
                agreeTerms
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Login
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-500 text-sm">Or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex flex-col justify-center items-center gap-4">
              <p className="text-gray-500">Don’t have an account? Create One</p>
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-white p-2 w-1/2 rounded-lg bg-red-500 font-semibold transition ease-in-out hover:scale-110"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-full object-cover rounded-tl-3xl"
          />
        </div>
      </div>
    </div>
  );
}
