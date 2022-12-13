import { Link } from "react-router-dom";
import logo from "../assets/fastdive_white.png";
import git from "../assets/git.png";
import "../Button.css";

function header() {
  return (
    <>
      <div className="header-section">
        <div className="header-logo">
          <Link to="/">
            <img
              style={{ marginLeft: "30px" }}
              width="150px"
              src={logo}
              alt="fastdive"
            ></img>
          </Link>
        </div>
        <div className="header-nav">
          <ul>
            <li>
              <Link to="/">
                <button className="w-btn">MAIN</button>
              </Link>
            </li>
            <li>
              <Link to="/nftLogin">
                <button className="w-btn">NFT LOGIN</button>
              </Link>
            </li>
            <li>
              <Link to="/nftMetadata">
                <button className="w-btn">NFT METADATA</button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="header-right">
          <ul>
            <li>
              <a href="/">
                <img width="45px" src={git} alt="git" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default header;
