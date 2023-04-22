import React from "react";
import "../../../assets/scss/user/c__menuleft.scss";

function menuLeft() {
  return (
    <div className="menuleft">
      <div className="menuleft__wapper">
        <div className="menuleft__main">
          <ul className="menuleft__list">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Your library</a>
            </li>
            <li>
              <a href="#">History</a>
            </li>
            <li>
              <a href="#">Top song</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default menuLeft;
