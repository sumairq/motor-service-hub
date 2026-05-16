import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState("");

  const handleChange = (e) => {
    setformData((prev)=>{
      return {
      ...prev,
      [e.target.name]: e.target.value,
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      if (data.status === "success") setValidation("Logged in successfully!");
      console.log(data);
    } catch (err) {
      setValidation(err.message);
      console.error(err);
    }
  };

  return (
    <>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <button className="form-actions btn" type="submit">
            Log In
          </button>
          <a style={{ color: "white" }} className="form-actions" href="/signup">
            Don't have an account Sign Up
          </a>
        </div>
        {validation !== "" && (
          <p style={{ color: "white", paddingTop: "30px" }}>{validation}</p>
        )}
      </form>
    </>
  );
}
