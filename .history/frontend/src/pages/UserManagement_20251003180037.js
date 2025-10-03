import { useState, useEffect } from "react";
import API from "../api/axiosConfig";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users"); // since backend route is /api/users
      setUsers(res.data.users);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User Management</h2>
      {message && <div>{message}</div>}
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} ({u.email}) - {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
