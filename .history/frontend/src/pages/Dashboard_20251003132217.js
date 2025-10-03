import { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [message, setMessage] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch tasks");
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAdd = async (task) => {
    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, task);
        setEditTask(null);
      } else {
        await API.post("/tasks", task);
      }
      fetchTasks();
      setMessage("Task saved successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      setMessage("Task deleted");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        {message && <div className="alert alert-info">{message}</div>}
        <TaskForm onSubmit={handleAdd} task={editTask} />
        <h3>Tasks</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.owner?.name || "N/A"}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => setEditTask(t)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
