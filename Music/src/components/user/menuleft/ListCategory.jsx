import React from "react";
import "../../../assets/scss/user/c__listcategory.scss";
import ListSongItem from "./ListSongItem";

function ListCategory() {
  return (
    <div className="listcategory">
      <div className="listcategory__wapper">
        <div className="listcategory__main">
          <div className="listcategory__main__header">
            <h2 className="listcategory__main__title">Hot</h2>
            <a href="/list-hot-song">See more</a>
          </div>
          <div className="listcategory__main__list">
            <ListSongItem />
            <ListSongItem />
            <ListSongItem />
            <ListSongItem />
            <ListSongItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCategory;
