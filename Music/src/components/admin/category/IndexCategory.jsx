import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../../assets/scss/admin/c__indexcategory.scss";
import AddCategory from "./AddCategory";
import ListCategory from "./ListCategory";
import ListSong from "./ListSong";

function IndexCategory() {
  const [categories, setCategories] = useState([]);

  const handleAddCategory = (newCategory) => {
    // Thêm mục mới vào danh sách
    setCategories([categories, newCategory]);
  };
  console.log(categories);
  //load lisst
  const [load, setLoad] = useState(false);
  const handleLoad = () => {
    // Thêm mục mới vào danh sách
    setLoad(true);
  };

  const [list, setList] = useState([]);
  const [listSong, setListSong] = useState([]);
  // url api
  const url = "https://localhost:7122/api/Categories";

  // api lay danh sach
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setList(response.data);
      })
      .catch();
  }, []);

  return (
    <div className="index">
      <div className="index__wapper">
        <div className="index__wapper__main">
          <div className="index__wapper__main__form">
            <AddCategory loads={categories} />
          </div>
          <div className="index__wapper__main__table">
            <ListCategory
              reload={handleAddCategory}
              dataCategory={list}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexCategory;
