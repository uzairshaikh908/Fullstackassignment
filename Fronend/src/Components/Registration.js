import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";

const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => setIsRegistering(!isRegistering);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, dob, email, password } = form;

    const endpoint = isRegistering
      ? "http://localhost:8000/api/user/register"
      : "http://localhost:8000/api/user/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRegistering ? { name, dob, email, password } : { email, password }
        ),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          alert("Registration successful!");
          setIsRegistering(false);
        } else {
          if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          } else {
            alert("User not registered!");
          }
        }
        setForm({ name: "", dob: "", email: "", password: "" });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(isRegistering ? "Registration failed" : "Login failed");
    }
  };

  return (
    <div className="registration-container">
      <button className="top-toggle-button" onClick={toggleForm}>
        {isRegistering ? "Login" : "Register"}
      </button>
      <div className="form-wrapper">
        <h2 className="form-title">
          <FaUserAlt />
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div className="input-field">
                <FaUserAlt className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <CiCalendarDate className="input-icon" />
                <input
                  type="text"
                  name="dob"
                  placeholder="Date of Birth (DD-MM-YYYY)"
                  value={form.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className="input-field">
            <FaUserAlt className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <RiLockPasswordFill className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
