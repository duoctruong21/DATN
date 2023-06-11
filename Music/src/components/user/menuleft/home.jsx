import React from "react";
import ListTopic from "./ListTopic";
import ListCategory from "./ListCategory.jsx";
import "../../../assets/scss/user/c__home.scss";
import Footer from "./Footer";
import ListSinger from "./ListSinger";

function home() {
  return (
    <div className="home">
      <ListTopic />
      <ListCategory />
      <ListSinger />

      <Footer />
    </div>
  );
}

export default home;
