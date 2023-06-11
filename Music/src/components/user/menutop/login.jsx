import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuTop from "../menu/menuTop.jsx";

import "../../../assets/scss/user/c__login.scss";

function Login({ onLogin }) {
  const history = useNavigate();
  const [token, setToken] = useState([]);

  const loginUrl = "https://localhost:7122/login";
  const login = async (event) => {
    event.preventDefault();
    const username = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    await axios
      .post(`${loginUrl}/${username}/${password}`)
      .then((response) => {
        const data = response.data;
        setToken(response.data);
        console.log(response.data);
        localStorage.setItem("token", data.token);
        history('/home')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="login__wapper">
        <div className="login__wapper__main">
          <div className="login__wapper__main__title">
            <h2>Music</h2>
          </div>
          <form
            onSubmit={login}
            action="post"
            className="login__wapper__main__form">
            <div className="login__wapper__main__form__control">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="login__wapper__main__form__control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div>
                <a href="/home">back</a>
              <div>
                <a href="/register">Register</a>
                <button value="submit">Login</button>
              </div>
            </div>
            <div className="login__wapper__main__social">
              {/* <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                <p>Login With Google</p>
              </a>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
                <p>Login With FaceBook</p>
              </a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
