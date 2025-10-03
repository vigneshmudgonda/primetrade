import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, task }) => {
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (task) setForm({ title: task.title, description: task.description });
  }, [task]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input className="form-control mb-2" type="text" name="title" placeholder="Task Title" value={form.title} onChange={handleChange} required />
      <textarea className="form-control mb-2" name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
      <button className="btn btn-primary" type="submit">{task ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
