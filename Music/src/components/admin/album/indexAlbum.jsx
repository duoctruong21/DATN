import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/admin/c__index.scss";
import axios from "axios";
import Footer from "../../user/menuleft/Footer";
import { useNavigate } from "react-router-dom";

function IndexAlbum() {
  const albumUrl = "https://localhost:7122/api/Albums"; // get api
  const [Albums, setAlbums] = useState([]);
  // get data from api
  useEffect(() => {
    axios
      .get(albumUrl)
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // pagedlist
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 6;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(Albums.length / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  // Delete
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async (id) => {
    const result = confirm("do you want to delete this item ?");
    if (result) {
      setIsDeleting(true);
      try {
        await axios.delete(`${albumUrl}/${id}`);
        setAlbums(Albums.filter((album) => album.id !== id));
        setIsDeleting(false);
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
            <h2>List Album</h2>
            <a href="/admin/album/add">Add</a>
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
                  <th>Created date</th>
                  <th>Modified date</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {/* data, you can use for loop to set */}
                {Albums.slice(pagesVisited, pagesVisited + songsPerPage).map(
                  (album, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{album.albumName}</td>
                      <td className="image">
                        <img
                          src={album.albumImg}
                          alt=""
                        />
                      </td>
                      <td>{album.createdDate}</td>
                      <td>{album.modifiedDate}</td>
                      <td>
                        <a href={`/admin/album/edit/${album.id}`}>Edit</a>
                        <button
                          disabled={isDeleting}
                          onClick={() => handleDelete(album.id)}>
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

export default IndexAlbum;
