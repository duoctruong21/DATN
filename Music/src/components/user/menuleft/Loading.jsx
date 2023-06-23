import React from 'react'
import "../../../assets/scss/user/c__load.scss";


function Loading() {
  return (
    <div className='loading'>
      <div class="loading-wave">
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
      </div>
    </div>
  );
}

export default Loading