import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { HiHeart } from "react-icons/hi";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-100 to-blue-300 px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10 mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8 flex items-center justify-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className="w-8 h-8 text-blue-800"
    fill="currentColor"
  >
    <path d="M32 58s-4.5-4.3-9.6-9.1C13 41 4 33.5 4 23.5 4 15 10 8 18 8c5 0 9 3 10 7 1-4 5-7 10-7 8 0 14 7 14 15.5 0 10-9 17.5-18.4 25.4C36.5 53.7 32 58 32 58z" />
    <path d="M30 22h4v10h10v4H34v10h-4V36H20v-4h10V22z" fill="white" />
  </svg>
  CareCompanion
</h1>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-200">
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-700 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
