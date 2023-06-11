import React from "react";

import "../../../assets/scss/user/c__indexPlaysong.scss";
import PlaySong from "../menuleft/PlaySong";

function indexPlaysong() {
  return (
    <div className="indexPlaysong">
      <div className="indexPlaysong__wapper">
        <div className="indexPlaysong__main">
          <div className="indexPlaysong__main__block">
            <img
              className="indexPlaysong__main__block__img"
              src="https://r5---sn-npoeenl7.googlevideo.com/videogoodput?id=o-AImFaSAFnjEMk9zR9UygBu9PNc_Ztu_VecEQevTVmQ1y&source=goodput&range=0-4999&expire=1686371203&ip=123.21.88.138&ms=pm&mm=35&pl=24&nh=IgpwZjAyLnNpbjEwKg8xNDIuMjUwLjE2NS4yMDk&sparams=id,source,range,expire,ip,ms,mm,pl,nh&signature=6C6F584D97D27ABF6E11955A5C52C4F92465F3D3.6FADD233E2FDFA8974AEB08FA5FD6D2A28B08881&key=cms1"
            />
            <div className="indexPlaysong__main__block__info">
              <h2>Ngủ một mình | Hiếu thứ hai</h2>
              <p>The night</p>
            </div>
          </div>
        </div>
        <audio controls>
          <source
            src="https://r5---sn-npoeenl7.googlevideo.com/videogoodput?id=o-AImFaSAFnjEMk9zR9UygBu9PNc_Ztu_VecEQevTVmQ1y&source=goodput&range=0-4999&expire=1686371203&ip=123.21.88.138&ms=pm&mm=35&pl=24&nh=IgpwZjAyLnNpbjEwKg8xNDIuMjUwLjE2NS4yMDk&sparams=id,source,range,expire,ip,ms,mm,pl,nh&signature=6C6F584D97D27ABF6E11955A5C52C4F92465F3D3.6FADD233E2FDFA8974AEB08FA5FD6D2A28B08881&key=cms1"
            type="audio/mpeg"
          />
        </audio>
      </div>
    </div>
  );
}

export default indexPlaysong;
