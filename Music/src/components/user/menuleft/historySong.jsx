import React, { useEffect, useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/user/c__historysong.scss";
import Footer from "./Footer";
import axios from "axios";

function HistorySong() {
  const [item,setItem] = useState([])
  const token = localStorage.getItem("token");
  const urlhistory = "https://localhost:7122/history";

  useEffect(()=>{
    axios.get(`${urlhistory}/${token}`).then((response)=>setItem(response.data)).catch()
  },[token])


  return (
    <div className="historysong">
      <div className="historysong__wapper">
        <div className="historysong__wapper__main">
          <p>Song</p>
          <p>Album</p>
          <p>Setting</p>
        </div>
      </div>
      <div className="historysong__wapper__song">
        <SongBar dataSongBar={item} />
      </div>
      <div className="historysong__wapper__page">

      </div>
      <Footer />
    </div>
  );
}

export default HistorySong;
