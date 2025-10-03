import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">TaskApp</Link>
        <div>
          <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
