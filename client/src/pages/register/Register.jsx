import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(register);
      await axios.post("/auth/register", register);
      // setMessage("User registered successfully"); // Set the success message
      setError(null); // Reset the error message
    } catch (err) {
      // setMessage(null); // Reset the success message
      console.log(err);
      setError(err.response.data); // Set the error message
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              onChange={handleChange}
              name="name"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
            />
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
            />
            {error && (
              <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
            )}
            <button onClick={handlesubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
