import React, { useState, useRef, useEffect } from "react";
import "../../../assets/scss/user/c__listToppic.scss";
import axios from "axios";

function ListTopic() {
  const [listItems, setListItems] = useState([]);
  const url = "https://localhost:7122/api/Topics";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setListItems(response.data))
      .catch();
  }, []);
  //console.log(listItems)

  const firstItemRef = useRef(null);
  const myListRef = useRef(null);
  function handleMoveFirstItemToLast() {
    // Lấy thẻ li đầu tiên hiện tại
    setTimeout(() => {
      try {
        let firstItem = myListRef.current.querySelector("li:first-child");
        if (firstItem) {
          myListRef.current.appendChild(firstItem);
        }
      } catch (error) {
        console.error(error);
      }
    }, 2000);
  }
  function backtopic() {
    // Lấy thẻ li đầu tiên hiện tại
    let firstItem = myListRef.current.querySelector("li:first-child");
    if (firstItem !== null) {
      myListRef.current.appendChild(firstItem);
    }
  }
  function nexttopic() {
    let lastItem = myListRef.current.querySelector("li:last-child");
    if (lastItem !== null) {
      myListRef.current.insertBefore(
        lastItem,
        myListRef.current.querySelector("li:first-child")
      );
    }
  }

  //setInterval(handleMoveFirstItemToLast, 2000);
  return (
    <div className="listtopic">
      <div className="listtopic__wapper">
        <ul
          ref={myListRef}
          id="list"
          className="listtopic__main">
          {listItems.map((item, index) => (
            <li
              key={index}
              ref={index === 0 ? firstItemRef : null}>
              <a href={`/topic/${item.alias}`}>
                <img
                  src={item.topicImg}
                  alt=""
                />
              </a>
            </li>
          ))}
        </ul>
        {/* nút */}
      </div>
      <ul className="listtopic__directional">
        <li>
          <button
            id="prev-btn"
            onClick={backtopic}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512">
              <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
        </li>
        <li>
          <button
            id="next-btn"
            onClick={nexttopic}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512">
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ListTopic;
