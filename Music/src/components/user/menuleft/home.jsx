import React from "react";
import ListTopic from "./ListTopic";
import ListCategory from "./ListCategory.jsx";
import "../../../assets/scss/user/c__home.scss";
import Footer from "./Footer";

function home() {
  return (
    <div className="home">
      <ListTopic />
      <ListCategory />

      <Footer />
    </div>
  );
}

export default home;
