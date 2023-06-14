import React, { useEffect,useState } from "react";
import "../../../assets/scss/user/c__menuleft.scss";
import axios from "axios";

function menuLeft() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");

  if(token!=null){
    useEffect(() => {
      if (token != null) {
        const urlUser = "https://localhost:7122/api/UserWebMusics";
        axios
          .get(`${urlUser}/${token}`)
          .then((response) => {
            setUser(response.data);
          })
          .catch();
      }
    }, [token]);
  }

  return (
    <div className="menuleft">
      <div className="menuleft__wapper">
        <div className="menuleft__main">
          {token != null ? (
            <ul className="menuleft__list">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/your-library">Your library</a>
              </li>
              <li>
                <a href="/your-history">History</a>
              </li>
              <li>
                <a href="/top-song">Top song</a>
              </li>
            </ul>
          ) : (
            <ul className="menuleft__list">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/top-song">Top song</a>
              </li>
            </ul>
          )}
          <ul
            className="menuleft__list"
            style={{ display: "none" }}>
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default menuLeft;
