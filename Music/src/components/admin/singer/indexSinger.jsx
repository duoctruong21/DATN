import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/admin/c__index.scss";
import axios from "axios";

function IndexSinger() {
  const singerUrl = "https://localhost:7122/api/Singers";
  const [Singers, setSingers] = useState([])

  useEffect(()=>{
    axios.get(singerUrl).then((response)=>{
      setSingers(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])
  // pagedlist
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 5;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(Singers.length / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  // delete
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async (id)=>{
    const result = confirm('do you want to delete this item?')
    if(result){
      setIsDeleting(true)
      try{
        await axios.delete(`${singerUrl}/${id}`).then(()=>{
          setIsDeleting(false)
          alert("delete success");
        })
      }catch(error){
        console.log(error)
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="index">
      <div className="index__wapper">
        <div className="index__wapper__main">
          <div className="index__wapper__main__header">
            <h2>List singer</h2>
            <a href="/admin/singer/add">Add</a>
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
                {Singers.slice(pagesVisited, pagesVisited + songsPerPage).map(
                  (singer, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{singer.singerName}</td>
                      <td>
                        <img
                          src={singer.fileimg}
                          alt=""
                        />
                      </td>
                      <td>{singer.createdDate}</td>
                      <td>{singer.modifiedDate}</td>
                      <td>
                        <a href={`/admin/singer/edit/${singer.id}`}>Edit</a>
                        <button
                          disabled={isDeleting}
                          onClick={() => handleDelete(singer.id)}>
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
    </div>
  );
}

export default IndexSinger;
