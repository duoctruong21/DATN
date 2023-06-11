import React, { useState, useEffect } from "react";
import "../../../assets/scss/user/c__menutop.scss";
import axios from "axios";
import SearchIndex from "../menuleft/SearchIndex";
import { useNavigate } from "react-router-dom";

function searchBar() {
  const [keySearch, setSearch] = useState("");
  const history = useNavigate();
  const search = async (content) => {
    content.preventDefault();
    try {
      const contents = content.target.elements.content.value;
      setSearch(contents);
      if (contents == "") {
        history(`/home`);
      } else {
        history(`/search/${contents}`);
      }
    } catch {
      console.log("1");
    }
  };
  return (
    <div>
      <form
        className="menuTop__Main__block__search"
        onSubmit={search}>
        <input
          type="text"
          id="content"
          name="content"
        />
        <button
          value="submit"
          href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default searchBar;
