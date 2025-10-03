import { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
