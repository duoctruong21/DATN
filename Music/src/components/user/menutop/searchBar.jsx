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

  // 
  const [check, setCheck] = useState(false)
  const handleCheck = () =>{
    if(check != true){
      setCheck(true);
    }else{
      setCheck(false);
    }
  }
  // recommend
  const [searchs, setSearchs] = useState([])
  const [content, setContent] = useState("")
  const handleschange = (e)=>{
    setContent(e)
  }
  useEffect(() => {
    axios
      .get(`http://truongduoc027-001-site1.dtempurl.com/recommend-search/${content}`)
      // .get(`https://localhost:7122/recommend-search/${content}`)
      .then((response) => setSearchs(response.data))
      .catch();
  }, [content]);
  console.log(searchs)

  return (
    <div className="search-responsive">
      <form
        className="menuTop__Main__block__search"
        onSubmit={search}>
        <input
          type="text"
          id="content"
          name="content"
          onClick={handleCheck}
          autocomplete="off"
          onChange={(e) => handleschange(e.target.value)}
        />
        <button
          value="submit"
          onClick={handleCheck}
          href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </button>
      </form>
      <div
        className="menuTop__Main__block__search__content"
        style={{ display: check == true ? "flex" : "none" }}>
        {searchs.map((value) => (
          <a
            className="menuTop__Main__block__search__key"
            href={`/song/${value.alias}`}>
            {value.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default searchBar;
