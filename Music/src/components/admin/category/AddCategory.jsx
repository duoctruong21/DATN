import React, {useEffect, useState} from "react";

import "../../../assets/scss/admin/c__addcategory.scss";
import axios from "axios";

function AddCategory({ loads }) {
  //tao bien luu gia tri
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [img, setImg] = useState(null);
  const [fileImg, setFileImg] = useState(null);
  const [check, setCheck] = useState(false)

  //tao ham luu gia tri thi thay doi
  const handleName = (e) => {
    setName(e);
  };
  const handleImg = (e) => {
    setImg(e);
    // Tạo đường dẫn URL cho ảnh được chọn
    const reader = new FileReader();
    reader.onload = () => {
      setFileImg(reader.result);
    };
    reader.readAsDataURL(e);
    setCheck(false); 

  };
  // url
  const url = "https://localhost:7122/api/Categories";
  console.log(check)
  console.log(fileImg)

  useEffect(() => {
    console.log(loads);
    setImg(null);
    setFileImg(null);
    if (loads[1] != null) {
      setName(loads[1].name);
      setImg(loads[1].img);
      setId(loads[1].id)
      setCheck(true);
      setFileImg(null)
    }
  }, [loads]);

  //reset
  const reset = ()=>{
    setId(0)
    setName("")
    setImg(null)
  }
  
  //add
  const add = (e) => {
    e.preventDefault();
    const dataSet = new FormData()
    dataSet.append("id", id);
    dataSet.append("name", name);
    dataSet.append("img", img);
    axios
      .post(url, dataSet, {
        headers: {
          "Content-Type": "multipart/fromdata",
        },
      })
      .then(() => {
        alert("Add success");
        setName("");
        setImg(null);
      })
      .catch();
  };

  return (
    <div className="addcategory">
      <div className="addcategory__wapper">
        <div className="addcategory__wapper__main">
          <div className="addcategory__wapper__main__title">
            <h2>Add Category</h2>
          </div>
          <form
            className="addcategory__wapper__main__form"
            onSubmit={add}>
            <div className="addcategory__wapper__main__form__control">
              <label htmlFor="topicname">Name</label>
              <input
                type="text"
                id="title"
                name="title"
                value={name}
                onChange={(e) => handleName(e.target.value)}
              />
            </div>
            <div className="addcategory__wapper__main__form__control">
              <label htmlFor="topicimg">Image</label>
              <input
                className="input--file"
                type="file"
                name="image"
                id="image"
                onChange={(e) => handleImg(e.target.files[0])}
              />
            </div>

            {check != true ? (
              <div className="addcategory__wapper__main__form__control">
                <img
                  src={fileImg}
                  alt=""
                />
              </div>
            ) : (
              <div className="addcategory__wapper__main__form__control">
                <img
                  src={img}
                  alt=""
                />
              </div>
            )}
            <div className="addcategory__wapper__main__form__confirm">
              <a onClick={reset}>Reset</a>
              <button value="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
