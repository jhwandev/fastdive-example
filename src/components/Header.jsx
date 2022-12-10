import { Link } from "react-router-dom";
import logo from "../assets/fastdive_white.png";
import git from "../assets/git.png";
import "../Button.css";

function header() {
  return (
    <>
      <div class="header-section">
        <div class="header-logo">
          <Link to="/">
            <img
              style={{ marginLeft: "30px" }}
              width="150px"
              src={logo}
              alt="fastdive"
            ></img>
          </Link>
        </div>
        <div class="header-nav">
          <ul>
            <li>
              <Link to="/">
                <button className="w-btn">MAIN</button>
              </Link>
            </li>
            <li>
              <Link to="/nftLoginErc">
                <button className="w-btn">NFT LOGIN [ERC]</button>
              </Link>
            </li>
            <li>
              <Link to="/nftLoginKct">
                <button className="w-btn">NFT LOGIN [KCT]</button>
              </Link>
            </li>
            <li>
              <Link to="/nftLoginKct">
                <button className="w-btn">Metadat1</button>
              </Link>
            </li>
            <li>
              <Link to="/nftLoginKct">
                <button className="w-btn">Metadata2</button>
              </Link>
            </li>
          </ul>
        </div>
        <div class="header-right">
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
