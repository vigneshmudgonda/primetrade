import { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch tasks");
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // Add User
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users", newUser);
      setMessage("User added successfully!");
      setNewUser({ name: "", email: "", role: "user" });
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add user");
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      setMessage("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete user");
    }
  };

  // Edit User Role (quick example)
  const handleRoleChange = async (id, role) => {
    try {
      await API.patch(`/users/${id}`, { role });
      setMessage("User updated successfully!");
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update user");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {message && <div className="alert alert-info rounded">{message}</div>}

        {/* Admin Panel */}
        <div className="card mb-4 shadow-sm border-primary">
          <div className="card-header bg-primary text-white">
            Admin Panel: Manage Users
          </div>
          <div className="card-body">
            <p className="card-text">
              <strong>Note:</strong> Only <span className="text-primary">admins</span> 
              can add, edit, or delete users. Use this panel to manage all registered users.
            </p>

            {/* Add User Form */}
            <form onSubmit={handleAddUser} className="mb-3">
              <div className="row g-2">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <button type="submit" className="btn btn-success w-100">
                    Add User
                  </button>
                </div>
              </div>
            </form>

            {/* Users Table */}
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((u) => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={u.role}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteUser(u._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
