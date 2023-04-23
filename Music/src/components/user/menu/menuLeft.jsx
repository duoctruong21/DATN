import React from "react";
import "../../../assets/scss/user/c__menuleft.scss";

function menuLeft() {
  return (
    <div className="menuleft">
      <div className="menuleft__wapper">
        <div className="menuleft__main">
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
        </div>
      </div>
    </div>
  );
}

export default menuLeft;
