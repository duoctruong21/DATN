import React from "react";
import ListTopic from "./ListTopic";
import ListCategory from "./ListCategory.jsx";
import "../../../assets/scss/user/c__home.scss";

function home() {
  return (
    <div className="home">
      <ListTopic />
      <ListCategory />
    </div>
  );
}

export default home;
