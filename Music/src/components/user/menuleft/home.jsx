import React, { useEffect, useState } from "react";
import ListTopic from "./ListTopic";
import ListCategory from "./ListCategory.jsx";
import "../../../assets/scss/user/c__home.scss";
import Footer from "./Footer";
import ListSinger from "./ListSinger";
import Recommned from "./Recommned";
import Recommnedbycategory from "./Recommendbycategory";
import axios from "axios";

function home() {
  const token = localStorage.getItem("token");

  //
  const [category, setCategory] = useState([]);
  const [checknote, setchecknote] = useState([]);
  const [loadnote, setLoadnote] = useState(true)
  useEffect(() => {
    axios
      .get("https://localhost:7122/api/Categories")
      .then((response) => setCategory(response.data))
      .catch();
  }, []);
  useEffect(() => {
   if(loadnote==true){
     axios
       .get(`https://localhost:7122/api/UserWebMusics/${token}`)
       .then((response) => {
         setchecknote(response.data);
         setLoadnote(false)
       })
       .catch(() => {
         console.log("1");
       });
   }
  }, [loadnote]);

  const [check, setCheck] = useState([]);
  const handlesCategory = (e, id) => {
    e.preventDefault();
    if (!check.includes(id)) {
      setCheck([...check, id]);
    } else {
      setCheck(check.filter((id1) => id1 !== id));
    }
  };

  const onclickok = () => {
    const content = check.join(" ");
    axios
      .post(`https://localhost:7122/categoryfirstuser/${token}/${content}`)
      .then(() => {
        alert("Nghe nhac vui ve ban nhe");
        setLoadnote(true)
      })
      .catch();
  };
  console.log(checknote);

  return (
    <div className="home">
      <ListTopic />
      <ListCategory />
      <ListSinger />
      <div style={{ display: token == null ? "none" : "block" }}>
        <Recommned />
      </div>
      <Recommnedbycategory />
      <Footer />
      {token == null ? (
        ""
      ) : checknote.note == null ? (
        <div className="Recommned-post-category" >
          <form
            className="Recommned-post-category__form"
            action="">
            {category.map((item, index) => (
              <a
                key={index}
                onClick={(e) => handlesCategory(e, item.categoryName)}
                className={`Recommned-post-category__name ${
                  check.filter((id) => id === item.categoryName) !=
                  item.categoryName
                    ? ""
                    : "active-category"
                }`}>
                {item.categoryName}
              </a>
            ))}
          </form>
          <button
            onClick={onclickok}
            className="Recommned-post-category__ok">
            ok
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default home;
