import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "./"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route path="*" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? <Admin /> : <Dashboard />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
