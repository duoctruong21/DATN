import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/admin/c__index.scss";
import axios from "axios";
import Footer from "../../user/menuleft/Footer";

function IndexSong() {
  const songUrl = "https://localhost:7122/api/Songs";
  const [Songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get(songUrl)
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  //pagedlist
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 5;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(Songs.length / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  // delete
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async (id) => {
    const result = confirm("do you want to delete this item ?");
    if (result) {
      setIsDeleting(true);
      try {
        axios.delete(`${songUrl}/${id}`);
        setIsDeleting(false);
        alert("delete success");
      } catch (error) {
        console.log(error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="index">
      <div className="index__wapper">
        <div className="index__wapper__main">
          <div className="index__wapper__main__header">
            <h2>List Song</h2>
            <a href="/admin/song/add">Add</a>
          </div>
          <div className="index__wapper__main__table">
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>STT</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th style={{textAlign:"center"}}>Mp3</th>
                  <th>Created date</th>
                  <th>Modified date</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {/* data, you can use for loop to set */}
                {Songs.slice(pagesVisited, pagesVisited + songsPerPage).map(
                  (song, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{song.songName}</td>
                      <td>
                        <img
                          src={song.fileimg}
                          alt=""
                        />
                      </td>
                      <td>
                        <audio controls>
                          <source src={song.filesong} />
                        </audio>
                      </td>
                      <td>{song.createdDate}</td>
                      <td>{song.modifiedDate}</td>
                      <td>
                        <a href={`/admin/song/edit/${song.id}`}>Edit</a>
                        <button
                          disabled={isDeleting}
                          onClick={() => handleDelete(song.id)}>
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="index__wapper__main__table__page">
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default IndexSong;
