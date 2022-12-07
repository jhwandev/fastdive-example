import { Link } from "react-router-dom";

const buttonStyle = {
  width: "150px",
  height: "50px",
  background: "transparent",
  color: "white",
  border: "1px solid white",
};

function header() {
  return (
    <div style={{ background: "black", height: "80px" }}>
      <div style={{ display: "flex", paddingTop: "15px" }}>
        <div style={{ marginLeft: "20px" }}>
          <Link to="/">
            <button style={buttonStyle}>MAIN</button>
          </Link>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <Link to="/nftLogin">
            <button style={buttonStyle}>NFT LOGIN</button>
          </Link>
        </div>
        {/* <Link to="/nftMetadata">
          <button>NFT Metadata</button>
        </Link> */}
      </div>
    </div>
  );
}

export default header;
