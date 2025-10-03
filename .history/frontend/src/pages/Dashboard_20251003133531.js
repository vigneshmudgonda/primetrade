import { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // Fetch logged-in user

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

  const handleAdd = async (task) => {
    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, task);
        setEditTask(null);
      } else {
        await API.post("/tasks", task);
      }
      fetchTasks();
      setMessage("Task saved successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error saving task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      setMessage("Task deleted successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error deleting task");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {message && <div className="alert alert-info rounded">{message}</div>}

        {/* Admin Panel */}
        {user?.role === "admin" && (
          <div className="card mb-4 shadow-sm border-primary">
            <div className="card-header bg-primary text-white">
              Admin Panel: Manage Users
            </div>
            <div className="card-body">
              <p className="card-text">
                Here you can add, edit, or delete users. This section is only
                visible to admins.
              </p>
              <button className="btn btn-outline-light btn-sm">Go to User Management</button>
            </div>
          </div>
        )}

        {/* Task Form */}
        <TaskForm onSubmit={handleAdd} task={editTask} />

        {/* Tasks Table */}
        <h3 className="mt-4 mb-3">Tasks</h3>
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Owner</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
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
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => setEditTask(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No tasks found. Add a task above!
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

export default Dashboard;
