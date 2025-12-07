import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const isLogged = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogged ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={isLogged ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isLogged ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
