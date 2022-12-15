import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/fastdive_white.png";
import git from "../assets/git.png";
import "../Button.css";

function Header() {
  const [btnActive, setBtnActive] = useState("");

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setBtnActive("1");
        break;
      case "/nftLogin":
        setBtnActive("2");
        break;
      case "/nftMetadata":
        setBtnActive("3");
        break;

      default:
        break;
    }
  }, [location]);

  const toggleActive = (e) => {
    setBtnActive(() => {
      return e.target.value;
    });
  };

  return (
    <>
      <div className="header-section">
        <div className="header-logo">
          <Link onClick={toggleActive} to="/">
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
                <button
                  value="1"
                  className={"w-btn" + ("1" === btnActive ? " active" : "")}
                  // onClick={toggleActive}
                >
                  MAIN
                </button>
              </Link>
            </li>
            <li>
              <Link to="/nftLogin">
                <button
                  value="2"
                  className={"w-btn" + ("2" === btnActive ? " active" : "")}
                  // onClick={toggleActive}
                >
                  NFT LOGIN
                </button>
              </Link>
            </li>
            <li>
              <Link to="/nftMetadata">
                <button
                  value="3"
                  className={"w-btn" + ("3" === btnActive ? " active" : "")}
                  // onClick={toggleActive}
                >
                  NFT METADATA
                </button>
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

export default Header;
