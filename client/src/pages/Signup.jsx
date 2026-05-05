import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [validation, setValidation] = useState("");

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      if (data.status === "success")
        setValidation("User Created Successfully!");
    } catch (err) {
      console.log(err);
      setValidation(err.message);
    }
  };

  return (
    <>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Password Confirm:</label>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Password Confirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <button className="form-actions btn" type="submit">
            Sign Up
          </button>
          <a style={{ color: "white" }} className="form-actions" href="/login">
            Already have an account Account ? Log In
          </a>
        </div>
        {validation !== "" && (
          <p style={{ color: "white", paddingTop: "30px" }}>{validation}</p>
        )}
      </form>
    </>
  );
}
