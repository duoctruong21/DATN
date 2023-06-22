import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../../assets/scss/admin/c__indexcategory.scss";
import { useParams } from "react-router-dom";

function AddSongToCategory() {
  const [song, setSong] = useState([]);
  const url = "https://localhost:7122/addsongincategory";
  const {id} = useParams()

  // api lay danh sach
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setSong(response.data);
      })
      .catch();
  }, []);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const handleCheckboxChange = (event, songId) => {
    if (event.target.checked) {
      setSelectedSongs([...selectedSongs, songId]);
    } else {
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));
    }
  };

  const add = ()=>{
    const dataSet = {
        id:id,
        list:selectedSongs
    }
    axios
      .post(url, dataSet)
      .then(() => {
        alert("Add success");
        setName("");
        setImg(null);
      })
      .catch();
  }

  return (
    <div className="index">
      <div className="index__wapper">
        <button onClick={add}>Thêm</button>
        <div className="index__wapper__main">
          <div className="index__wapper__main__tablesong">
            <div className="index__wapper__main__tablesong1">
              <table>
                <thead>
                  <tr>
                    <th>Chọn</th>
                    <th>id</th>
                    <th>name</th>
                    <th>img</th>
                  </tr>
                </thead>
                <tbody>
                  {song.map((item, index) => (
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedSongs.includes(item.id)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.id)
                          }
                        />
                      </td>
                      <td>{item.id}</td>
                      <td>{item.songName}</td>
                      <td>
                        <img
                          className="img--50px"
                          src={item.fileimg}
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="index__wapper__main__table">
            <div className="index__wapper__main__tablesong1">
              <table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>img</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                {selectedSongs != null
                  ? selectedSongs.map((item, index) => (
                      <tbody>
                        {song
                          .filter((id) => id.id === item)
                          .map((items) => (
                            <tr>
                              <td>{items.id}</td>
                              <td>{items.songName}</td>
                              <td>
                                <img
                                  className="img--50px"
                                  src={items.fileimg}
                                  alt=""
                                />
                              </td>
                              <td><button>Xóa</button></td>
                            </tr>

                          ))}
                      </tbody>
                    ))
                  : ""}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSongToCategory;
