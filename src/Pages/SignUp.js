import React, { useState } from "react";
import { Form } from "react-bootstrap";
import firebase from "firebase";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link, useHistory } from "react-router-dom";
import avatar from "../Images/avatar.png"
import axios from "axios";

import "./Login.css";
import { toast, ToastContainer } from "react-toastify";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const auth = firebase.auth();
  const db = firebase.firestore();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const signup = () => {
    axios({
      method: "POST",
      url: "http://localhost:8080/api/signup",
      data: {
        name: credentials.name,
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
        <h4>Sign Up Here</h4>
        <p>Enter your details below</p>
        <div className="admin-login-input-div">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={credentials.name}
            onChange={handleChange}
            className="admin-login-input"
          ></input>
        </div>
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
        <button onClick={signup} className="admin-login-btn">
          Sign Up
        </button>
        <p style={{marginTop: "12px", color: "rgba(0,0,0,0.650)", fontSize: "12px"}}>If you're an existing user, <Link to="/">Sign In</Link> instead</p>

      </div>
    </div>
  );
}
