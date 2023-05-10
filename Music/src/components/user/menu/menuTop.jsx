import "../../../assets/scss/user/c__menutop.scss";

function MenuTop() {
  return (
    <div className="menuTop">
      <div className="menuTop__wapper">
        <div className="menuTop__Main">
          <div className="menuTop__Main__logo">
            <h2>Music</h2>
          </div>
          <div className="menuTop__Main__block">
            <div className="menuTop__Main__block__search">
              <input type="text" />
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </a>
            </div>
            <ul className="menuTop__Main__block__login">
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuTop;
