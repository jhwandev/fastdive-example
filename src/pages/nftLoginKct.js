import { useState } from "react";
import klaytn from "../assets/klaytn.png";
import kaikas from "../assets/kaikas.png";
import Highlight from "react-highlight";
import { exampleCodeInitial, responseInitial } from "../exampleCode.js";

function NftLoginKct() {
  const [exampleCode, setExampleCode] = useState(exampleCodeInitial);
  const [response, setResponse] = useState(responseInitial);
  return (
    <>
      <section className="content">
        <div className="flexbox">
          {/* flex item 1 */}
          <div className="item">
            {/* title */}
            <div className="title">
              <img className="img-title" src={klaytn} alt="klaytnLogo" />
              &nbsp;&nbsp;
              <span>Klaytn KIP-17</span>
            </div>
            {/* title end */}
            <br />
            &nbsp;Fast-dive API KEY
            <input className="w-input" />
            <br />
            <br />
            &nbsp;Contract Address [KIP-17]
            <br />
            <input className="w-input" />
            <br />
            <br />
            <div>
              <button className="connect-btn">
                <img
                  style={{ width: "20px", paddingRight: "15px" }}
                  src={kaikas}
                  alt="kaikasLogin"
                />
                <span
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "medium",
                  }}
                >
                  Connect to Kaikas
                </span>
              </button>
            </div>
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <div style={{ flex: 9 }}>
                <span>&nbsp;Response</span>
              </div>
              <div style={{ flex: 1, paddingRight: 2 }}>
                <button>Count</button>
              </div>
              <div style={{ flex: 1, paddingRight: 2 }}>
                <button>TokenId</button>
              </div>
              <div style={{ flex: 1 }}>
                <button>Metadata</button>
              </div>
            </div>
            <textarea className="w-textarea" disabled value={response} />
          </div>
          {/* flex item 1 end */}
          {/* flex item 2 */}
          <div className="item">
            <div style={{ marginTop: "17.5%" }}>
              &nbsp;ExampleCode
              <div style={{ marginTop: "-8px" }}>
                <Highlight language="javascript">{exampleCode}</Highlight>
              </div>
            </div>
          </div>
          {/* flex item 2 end */}
        </div>
      </section>
    </>
  );
}

export default NftLoginKct;
