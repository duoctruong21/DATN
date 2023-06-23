import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__listcategory.scss";
import axios from "axios";
import PlaySong from "./PlaySong";
import ListSongItem from "./ListSongItem";

function ListCategory() {
  //const url = "https://localhost:7122/home";
  const url = "http://truongduoc027-001-site1.dtempurl.com/home";
  const [itemSong, setItemSong] = useState([]);

  useEffect(() => {
    axios.get(url).then((respose) => {
      setItemSong(respose.data);
    });
  }, []);

  return (
    <div className="listcategory">
      <div className="listcategory__wapper">
        <div className="listcategory__main">
          <div className="listcategory__main__header">
            <h2 className="listcategory__main__title">Hot song</h2>
            <a href="/list-hot-song">See more</a>
          </div>
          <ListSongItem dataSongItem={itemSong} />
        </div>
      </div>
      {/* <PlaySong dataForm={itemSong} /> */}
    </div>
  );
}

export default ListCategory;
