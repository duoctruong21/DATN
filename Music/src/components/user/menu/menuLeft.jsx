import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__menuleft.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function menuLeft() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");



  if (token != null) {
    useEffect(() => {
      if (token != null) {
        //const urlUser = "https://localhost:7122/api/UserWebMusics";
        const urlUser =
          "http://truongduoc027-001-site1.dtempurl.com/api/UserWebMusics";
        //truongduoc027-001-site1.dtempurl.com/
        http: axios
          .get(`${urlUser}/${token}`)
          .then((response) => {
            setUser(response.data);
          })
          .catch();
      }
    }, [token]);
  }

  const history = useNavigate()
  const onclickhistory = ()=>{
    history("/your-history");
  }
  const onclickhome = () => {
    history("/home");
  };
  const onclicklib = () => {
    history("/your-library");
  };
  const onclicktop = () => {
    history("/top-song");
  };


  return (
    <div className="menuLeft-responsive">
      <button className="menuLeft-responsive-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512">
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>
      <div className="menuleft">
        <div className="menuleft__wapper">
          <div className="menuleft__main">
            {token != null ? (
              <ul
                className="menuleft__list"
                style={{ display: token == 6 ? "none" : "block" }}>
                <li>
                  <a onClick={onclickhome}>Home</a>
                </li>
                <li>
                  <a onClick={onclicklib}>Your library</a>
                </li>
                <li>
                  <a onClick={onclickhistory}>History</a>
                </li>
                <li>
                  <a onClick={onclicktop}>Top song</a>
                </li>
              </ul>
            ) : (
              <ul className="menuleft__list">
                <li>
                  <a onClick={onclickhome}>Home</a>
                </li>
                <li>
                  <a onClick={onclicktop}>Top song</a>
                </li>
              </ul>
            )}
            <ul
              className="menuleft__list"
              style={{ display: token != 6 ? "none" : "block" }}>
              <li>
                <a href="/admin/topic">Topic</a>
              </li>
              <li>
                <a href="/admin/album">Album</a>
              </li>
              <li>
                <a href="/admin/singer">Singer</a>
              </li>
              <li>
                <a href="/admin/song">Song</a>
              </li>
              <li>
                <a href="/admin/category">Category</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default menuLeft;
