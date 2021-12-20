import React, { useState } from "react";
import { Form } from "react-bootstrap";
import firebase from "firebase";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link, useHistory } from "react-router-dom";
import avatar from "../Images/avatar.png";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const login = () => {
    axios({
      method: "POST",
      url: "https://is-project-b9.herokuapp.com/api/login",
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    })
      .then((response) => {
        const userId = response.data.user.id;
        if(response.status == 200) {
          history.push(`/chat/${userId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="admin-login-parent-div">
      <ToastContainer />
      <div className="admin-login-form-div">
        <img src={avatar} className="mini-icon"></img>
        <h4>Login To Chat</h4>
        <p>Enter your login details below</p>
        <div className="admin-login-input-div">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-Mail"
            value={credentials.email}
            onChange={handleChange}
            className="admin-login-input"
          ></input>
        </div>
        <div className="admin-login-input-div">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="admin-login-input"
          ></input>
        </div>
        <Form.Check
          type="checkbox"
          className="password-check"
          value={showPassword}
          onChange={() => {
            setShowPassword((prev) => !prev);
          }}
          label="Show Password"
        />
        <button onClick={login} className="admin-login-btn">
          Login
        </button>
        <p
          style={{
            marginTop: "12px",
            color: "rgba(0,0,0,0.650)",
            fontSize: "12px",
          }}
        >
          If you're new here, <Link to="/signup">Sign Up</Link> instead
        </p>
      </div>
    </div>
  );
}
