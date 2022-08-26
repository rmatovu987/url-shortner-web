import React, { useState } from "react";
import "./login.css";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
  }

  let navigate = useNavigate();
  

  async function login(event){
    const postData = {
      'user': {
        'email': email,
        'password': password,
      }
    };
    event.preventDefault()
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };

      const res = await fetch(
        "http://127.0.0.1:3000/api/users/login",
        requestOptions
      );

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();
      
      sessionStorage.setItem("url_token", data.user.token);

      navigate('/activity')

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-inner">
        <form onSubmit={login}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck1"
              />
              <label className="form-check-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
