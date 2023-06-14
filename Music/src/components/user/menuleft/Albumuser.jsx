import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__songitem.scss";
import ReactPaginate from "react-paginate";

function ListSongItem(props) {
  // get data
  const [itemSong, setItemSong] = useState([]);
  useEffect(() => {
    setItemSong(props.dataSongItem);
  }, [props.dataSongItem]);
  // console.log(itemSong)

  // phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 10;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(itemSong.length / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className="ListSongItem">
        {itemSong
          .slice(pagesVisited, pagesVisited + songsPerPage)
          .map((song, index) => (
            <div
              key={index}
              href="#"
              className="SongItem">
              <div className="SongItem__item">
                <img
                  src={
                    song.fileimg == null
                      ? "https://i.pinimg.com/564x/41/07/4b/41074b335e04b4432918ea6dd636b2be.jpg"
                      : song.fileimg
                  }
                  alt={song.albumname}
                />
                <div className="SongItem__item__info">
                  <a href={`/album/${song.linkalbum}`}>{song.albumUserName}</a>
                  <p>Số lượng {song.count}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="listtopsong__wapper__page">
        {itemSong.length < 10 ? (
          ""
        ) : (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        )}
      </div>
    </div>
  );
}

export default ListSongItem;
