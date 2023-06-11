import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__songbar.scss";
import ReactPaginate from "react-paginate";
import PlaySong from "./PlaySong";

function SongBar(props) {
  const [songs, setSong] = useState([]);
  const [loadSong, setLoadSong] = useState(false);

  useEffect(() => {
    setSong(props.dataSongBar);
  }, [props.dataSongBar]);

  // phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 10;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(songs.length / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const [mp3, setMp3] = useState("");
  const playSong = (id) => {
    songs.forEach((song, index) => {
      if (id === song.idSong) {
        setMp3(song.idSong);
        console.log(mp3);
        console.log(index);
        setLoadSong(true);
      }
    });
  };

  return (
    <div>
      <div className="ListSongBar">
        {songs
          .slice(pagesVisited, pagesVisited + songsPerPage)
          .map((song, index) => (
            <div
              className="songBar "
              key={song.idSong}>
              <div className="songBar__wapper">
                <div className="songBar__wapper__index">
                  <p className="songBar__wapper__index__p">
                    {pagesVisited + index + 1}
                  </p>
                  <button onClick={() => playSong(song.idSong)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 384 512">
                      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>
                  </button>
                </div>
                <div className="songBar__wapper__main">
                  <div className="songBar__wapper__main__infoSong">
                    <img
                      src={
                        song.fileImg === ""
                          ? "https://i.pinimg.com/564x/41/07/4b/41074b335e04b4432918ea6dd636b2be.jpg"
                          : song.fileImg
                      }
                      alt={song.songName}
                    />
                    <div className="songBar__wapper__main__infoSong__info">
                      <a href={`/song/${song.linksong}`}>
                        <h2>{song.songName}</h2>
                      </a>
                      <a href={`/singer/${song.linksinger}`}>
                        <p>{song.singerName}</p>
                      </a>
                    </div>
                  </div>
                  <div className="songBar__wapper__main__album">
                    <p>{song.albumName}</p>
                  </div>
                  <div className="songBar__wapper__main__setting">
                    <a href="#">Download </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="listtopsong__wapper__page">
        {songs.length < 10 ? (
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
      <PlaySong
        dataForm={songs}
        idPlaying={mp3}
        load={loadSong}
      />
    </div>
  );
}

export default SongBar;
