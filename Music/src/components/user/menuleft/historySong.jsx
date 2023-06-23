import React, { useEffect, useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/user/c__historysong.scss";
import Footer from "./Footer";
import axios from "axios";
import Loading from "./Loading";

function HistorySong() {
  const [item, setItem] = useState([]);
  const token = localStorage.getItem("token");
  //const urlhistory = "https://localhost:7122/history";
  const urlhistory = "http://truongduoc027-001-site1.dtempurl.com/history";

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${urlhistory}/${token}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch();
  }, [token]);

  return (
    <div className="historysong">
      <div className="historysong__wapper">
        <div className="historysong__wapper__main">
          <p>Song</p>
        </div>
      </div>
      <div className="historysong__wapper__song">
        {item.length == 0 ? (
          <div className="historysong__wapper__song__title">
            <h2 className="historysong__wapper__song__name">Null</h2>
          </div>
        ) : (
          ""
        )}
        <SongBar dataSongBar={item} />
      </div>
      <div className="historysong__wapper__page"></div>
      <Footer />
      {loading != false ? <Loading /> : ""}
    </div>
  );
}

export default HistorySong;
