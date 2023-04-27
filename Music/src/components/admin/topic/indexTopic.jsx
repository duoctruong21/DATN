import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/admin/c__index.scss";

function IndexTopic() {
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 5;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(10 / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const songs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="index">
      <div className="index__wapper">
        <div className="index__wapper__main">
          <div className="index__wapper__main__header">
            <h2>List topic</h2>
            <a href="/admin/topic/add">Add</a>
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
                {songs
                  .slice(pagesVisited, pagesVisited + songsPerPage)
                  .map((song, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </td>
                      <td>1</td>
                      <td>The night</td>
                      <td>
                        <img
                          src="https://photo-zmp3.zmdcdn.me/banner/d/a/8/8/da888d3aaa65f746ac409949bd9e6463.jpg"
                          alt=""
                        />
                      </td>
                      <td>20-02-2023</td>
                      <td>23-04-2023</td>
                      <td>
                        <a href="/admin/topic/edit">Edit</a>
                        <a href="#">Delete</a>
                      </td>
                    </tr>
                  ))}
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
    </div>
  );
}

export default IndexTopic;
