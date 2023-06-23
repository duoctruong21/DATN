import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register() {

  const history = useNavigate()

  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [gmail, setGmail] = useState([]);
  const [password, setPassword] = useState([]);

  const [user, setUer] = useState([]);

  const url = "http://truongduoc027-001-site1.dtempurl.com/api/UserWebMusics";
  // const url = "https://localhost:7122/api/UserWebMusics";

  useEffect(()=>{
    axios.get(url).then((response)=>{
      setUer(response.data);
    }).catch()
  },[])

  const register = (e) => {
    e.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      gmail: gmail,
      password: password,
    };
    axios
      .post(url, data)
      .then((response) => {
        response.data;
        alert("Create Account Success ")
        history('/login')
      })
      .catch();
  };
  return (
    <div className="register">
      <div className="register__wapper">
        <div className="register__wapper__main">
          <div className="register__wapper__main__title">
            <h2>Music</h2>
          </div>
          <form
            onSubmit={register}
            action="post"
            className="register__wapper__main__form">
            <div className="register__wapper__main__form__control">
              <label htmlFor="firstName">First Name</label>
              <input
                type="firstName"
                name="firstName"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="register__wapper__main__form__control">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="lastName"
                name="lastName"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="register__wapper__main__form__control">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setGmail(e.target.value)}
              />
            </div>
            <div className="register__wapper__main__form__control">
              <label htmlFor="firstName"></label>
              <p>
                {user.map((user) =>
                  user.gmail == gmail ? "Gmail này đã được sử dụng" : ""
                )}
              </p>
            </div>
            <div className="register__wapper__main__form__control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <a href="/home">Back</a>
              <div>
                <a href="/login">Login</a>
                <button value="submit">register</button>
              </div>
            </div>
            <div className="register__wapper__main__social">
              {/* <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                <p>register With Google</p>
              </a>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
                <p>register With FaceBook</p>
              </a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
