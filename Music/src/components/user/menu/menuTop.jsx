import { useState, useEffect } from "react";
import "../../../assets/scss/user/c__menutop.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SearchBar from "../menutop/searchBar";

function MenuTop(props) {
  const [user, setUser] = useState("");
  const history = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // const data = props.dataLogin;
    // console.log(data);

    // console.log(props.dataLogin);
  }, []);

  useEffect(() => {
    if (token != null) {
      const urlUser = "https://localhost:7122/api/UserWebMusics";
      axios
        .get(`${urlUser}/${token}`)
        .then((response) => {
          setUser(response.data);
          console.log(user)
        })
        .catch();
    }
  },[token]);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/home");
  };

  return (
    <div className="menuTop">
      <div className="menuTop__wapper">
        <div className="menuTop__Main">
          <div className="menuTop__Main__logo">
            <h2>Music</h2>
          </div>
          <div className="menuTop__Main__block">
            <SearchBar />
            {token == null ? (
              <ul className="menuTop__Main__block__login">
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
              </ul>
            ) : (
              <ul className="menuTop__Main__block__login">
                <li>
                  <a
                    href="http://localhost:5173/home"
                    onClick={logout}>
                    {user.lastName + " " + user.firstName}
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuTop;
