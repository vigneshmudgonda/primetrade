import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

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
        import { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {message && <div className="alert alert-info rounded">{message}</div>}

        {/* Admin Panel */}
        <div className="card mb-4 shadow-sm border-primary">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            Admin Panel: Manage Users
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => navigate("/admin/users")}
            >
              Go to User Management
            </button>
          </div>
          <div className="card-body">
            <p className="card-text">
              Only admins can add, edit, or delete users. Use this panel to
              manage all registered users.
            </p>
          </div>
        </div>

        {/* Tasks Table */}
        <h3 className="mt-4 mb-3">All Tasks</h3>
        <div className="table-responsive shadow-sm">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((t) => (
                  <tr key={t._id}>
                    <td>{t.title}</td>
                    <td>{t.description}</td>
                    <td>
                      {t.owner?.name ? (
                        <span className="badge bg-success">{t.owner.name}</span>
                      ) : (
                        <span className="badge bg-secondary">Unassigned</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

      </Routes>
    </Router>
  );
}

export default App;
