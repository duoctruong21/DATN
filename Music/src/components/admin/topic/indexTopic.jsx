import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/admin/c__index.scss";
import axios from "axios";
import Footer from "../../user/menuleft/Footer";
import { useNavigate } from "react-router-dom";

function IndexTopic() {
  const [Topics, setTopics] = useState([]); // create variable useSate to save data in urltopic
  const urlTopic = "https://localhost:7122/api/Topics"; // create url variable save api link
  // get data from link api
  useEffect(() => {
    axios
      .get(urlTopic)
      .then((response) => {
        setTopics(response.data); // save data from api to setTopics
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  // pagedlist
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 6;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(Topics.length / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  // Delete item
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async (id) => {
    const result = confirm("do you want to delete this item ?");
    if(result) {
      setIsDeleting(true);
      try {
        await axios.delete(`${urlTopic}/${id}`);
        setTopics(Topics.filter((topic) => topic.id !== id));
        setIsDeleting(false);
        history("/admin/topic");
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
                {Topics.slice(pagesVisited, pagesVisited + songsPerPage).map(
                  (topic, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{topic.topicName}</td>
                      <td>
                        <img
                          src={topic.topicImg}
                          alt=""
                        />
                      </td>
                      <td>{topic.createdDate}</td>
                      <td>{topic.modifiedDate}</td>
                      <td>
                        <a href={`/admin/topic/edit/${topic.id}`}>Edit</a>
                        <button
                          disabled={isDeleting}
                          onClick={() => handleDelete(topic.id)}>
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

export default IndexTopic;
