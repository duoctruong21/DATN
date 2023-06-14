import React, { useEffect } from "react";
import "../../../assets/scss/user/c__menuleft.scss";

function menuLeft() {
  return (
    <div className="menuleft">
      <div className="menuleft__wapper">
        <div className="menuleft__main">
          <ul className="menuleft__list">
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
