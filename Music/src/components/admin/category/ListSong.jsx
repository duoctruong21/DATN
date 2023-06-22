import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../../assets/scss/admin/c__listsong.scss";

function ListSong({ reload, dataCategory }) {
  //tao bien luu gia tri
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [lists, setList] = useState([]);

  useEffect(() => {
    setList(dataCategory);
  }, [dataCategory]);

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
  
  const [idSong, setIdSong] = useState(0)
  const [isChecked, setIsChecked] = useState(false);

  const checkboxs = () =>{
    setIdSong(1)
  }
  console.log(idSong)


  return (
    <div>
      <div className="Listsong">
        <table>
          <thead className="Listsong__thead">
            <tr>
              <th className="padding--lr--10 Listsong__th--checkbox">
                <input
                  type="checkbox"
                />
              </th>
              {/* <th className="padding--lr--10 Listsong__th--stt">STT</th> */}
              <th className="padding--lr--10 Listsong__th--title">Title</th>
              <th className="padding--lr--10 Listsong__th--image">Image</th>
              {/* <th className="padding--lr--10 Listsong__th--modified">
                Modified date
              </th> */}
              {/* <th className="padding--lr--10 Listsong__th--manage">Manage</th> */}
            </tr>
          </thead>
          <tbody className="Listsong__tbody">
            {lists != null
              ? lists.map((item, index) => (
                  <tr key={index}>
                    <td className="padding--lr--10 Listsong__td--checkbox">
                      <input type="checkbox" id="id" />
                    </td>
                    {/* <td className="padding--lr--10 Listsong__td--stt">
                      {index + 1}
                    </td> */}
                    <td className="padding--lr--10 Listsong__td--title">
                      {item.songName}
                    </td>
                    <td className="padding--lr--10 Listsong__td--image">
                      <img
                        src={
                          item.fileimg != null
                            ? item.fileimg
                            : "https://cdn-icons-png.flaticon.com/512/3460/3460797.png"
                        }
                        alt=""
                      />
                    </td>
                    {/* <td className="padding--lr--10 Listsong__td--modified">
                      {item.modifiedDate != null
                        ? formatDate(item.modifiedDate)
                        : "N/A"}
                    </td> */}
                    {/* <td className="padding--lr--10 Listsong__td--manage">
                      <a
                        onClick={() =>
                          edit(item.id, item.categoryName, item.categoryImg)
                        }>
                        Edit
                      </a>
                      <button
                      //   disabled={isDeleting}
                      //   onClick={() => handleDelete(album.id)}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </td> */}
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

export default ListSong;
