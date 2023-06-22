import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../../assets/scss/admin/c__list.scss";

function ListCategory({ reload, dataCategory }) {
  //tao bien luu gia tri
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [lists, setList] = useState([]);

  useEffect(() => {
    setList(dataCategory);
  }, [dataCategory]);
  console.log(dataCategory);
  console.log(lists);

  // tao bien khi xoa item
  const [isDeleting, setIsDeleting] = useState(false);

  // dinh dang ngay
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  //tao ham luu gia tri thi thay doi
  const handleName = (e) => {
    setName(e);
  };
  const handleImg = (e) => {
    setImg(e);
  };

  //edit
  const [valueEdit, setValueEdit] = useState([]);
  const edit = (id, name, img) => {
    const dataSet = {
      id: id,
      name: name,
      img: img,
    };
    setValueEdit(dataSet);
    console.log(valueEdit);
    reload(dataSet);
  };

  return (
    <div>
      <div className="List">
        <table>
          <thead className="List__thead">
            <tr>
              <th className="padding--lr--10 List__th--checkbox">
                <input
                  type="checkbox"
                  required
                />
              </th>
              <th className="padding--lr--10 List__th--stt">STT</th>
              <th className="padding--lr--10 List__th--title">Title</th>
              <th className="padding--lr--10 List__th--image">Image</th>
              <th className="padding--lr--10 List__th--modified">
                Modified date
              </th>
              <th className="padding--lr--10 List__th--manage">Manage</th>
            </tr>
          </thead>
          <tbody className="List__tbody">
            {lists != null
              ? lists.map((item, index) => (
                  <tr key={index}>
                    <td className="padding--lr--10 List__td--checkbox">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                      />
                    </td>
                    <td className="padding--lr--10 List__td--stt">
                      {index + 1}
                    </td>
                    <td className="padding--lr--10 List__td--title">
                      {item.categoryName}
                    </td>
                    <td className="padding--lr--10 List__td--image">
                      <img
                        src={
                          item.categoryImg != null
                            ? item.categoryImg
                            : "https://cdn-icons-png.flaticon.com/512/3460/3460797.png"
                        }
                        alt=""
                      />
                    </td>
                    <td className="padding--lr--10 List__td--modified">
                      {item.modifiedDate != null
                        ? formatDate(item.modifiedDate)
                        : "N/A"}
                    </td>
                    <td className="padding--lr--10 List__td--manage">
                      <a
                        onClick={() =>
                          edit(item.id, item.categoryName, item.categoryImg)
                        }>
                        Edit
                      </a>
                      <a href={`/admin/category/${item.id}`}>Add song</a>
                      <button
                      //   disabled={isDeleting}
                      //   onClick={() => handleDelete(album.id)}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
        <div className="index__wapper__main__table__page"></div>
      </div>
    </div>
  );
}

export default ListCategory;
