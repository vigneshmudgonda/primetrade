import { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className="btn btn-success" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
