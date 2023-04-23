import React from "react";
import "../../../assets/scss/user/c__singerinfo.scss";
import SongBar from "./SongBar";

function SingerInfo() {
  return (
    <div className="singerinfo">
      <div className="singerinfo__wapper">
        <div className="singerinfo__wapper__main">
          <div className="singerinfo__wapper__main__info">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/music-52086.appspot.com/o/images%2F161b15ce-f32b-4473-ab5e-8fc4a4396d77.png?alt=media&token=02cf23f3-d4d1-4d3f-a009-c0b3929e8e04"
              alt=""
            />
            <h2>Độ Mixi</h2>
            <p>
              Độ Mixi tên thật là Phùng Thanh Độ sinh ngày 12 tháng 9 năm 1989
              tại thành phố Cao Bằng, tỉnh Cao Bằng. Là người dân tộc Tày thường
              được biết đến với nghệ danh Độ Mixi, là một nam rapper, youtuber
              người Việt Nam.
            </p>
          </div>
          <div className="singerinfo__wapper__main__song">
            <div className="singerinfo__wapper__main__song__title">
              <h2>Bài hát nổi bật</h2>
            </div>
            <div className="singerinfo__wapper__main__song__list">
              <SongBar />
              <SongBar />
              <SongBar />
              <SongBar />
              <SongBar />
            </div>
            <div className="singerinfo__wapper__main__song__seemore">
                <a href="/song-singer">
                    See more
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingerInfo;
