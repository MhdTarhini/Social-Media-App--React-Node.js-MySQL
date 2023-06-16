import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(register);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(register);
      await axios.post("http://localhost:4000/api/register", register);
    } catch (err) {
      setError(error.response.data);
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
              name="username"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
            />
            <input
              type="password"
              placeholder="email"
              onChange={handleChange}
              name="password"
            />
            {error && <div>{error}</div>}
            <button onClick={handlesubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
