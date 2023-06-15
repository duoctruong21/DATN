import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__listSinger.scss";
import axios from "axios";

function ListSinger() {
    const [singers, setSinger] = useState([])
    const url = "https://localhost:7122/singerTop5";
    useEffect(()=>{
        axios.get(url).then((response)=> setSinger(response.data)).catch()
    },[])
  return (
    <div className="ListSinger">
      <div className="ListSinger__wapper">
        <div className="ListSinger__wapper__main">
          <div className="ListSinger__wapper__main__header">
            <h2>Ca sĩ nỗi bậc</h2>
          </div>
          <div className="ListSinger__wapper__main__list">
            {singers.map((singer, index) => (
              <div
                className="ListSinger__wapper__main__list__item"
                key={index}>
                <img
                  className="ListSinger__wapper__main__list__item__img"
                  src={singer.fileimg}
                  alt={singer.singerName}
                />
                <div className="ListSinger__wapper__main__list__item__info">
                  <a href={`/singer/${singer.alias}`}>{singer.singerName}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSinger;
