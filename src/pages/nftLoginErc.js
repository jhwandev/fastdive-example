import React from "react";
import Highlight from "react-highlight";
import { useState } from "react";
import meta from "../assets/meta.svg";
import eth from "../assets/eth_logo.png";

import { exampleCodeInitial } from "../exampleCode.js";

function NftLoginKct() {
  const [exampleCode, setExampleCode] = useState(exampleCodeInitial);
  const [response, setResponse] = useState("");

  return (
    <>
      <section className="content">
        <div className="flexbox">
          {/* flex item 1 */}
          <div className="item">
            {/* title */}
            <div className="title">
              <img className="img-title" src={eth} alt="klaytnLogo" />
              &nbsp;&nbsp;
              <span>Ethereum ERC-721</span>
            </div>
            {/* title end */}
            <br />
            &nbsp;Fast-dive API KEY
            <input className="w-input" />
            <br />
            <br />
            &nbsp;Contract Address [ERC-721]
            <br />
            <input className="w-input" />
            <br />
            <br />
            <div>
              <button className="connect-btn">
                <img
                  style={{ width: "30px", paddingRight: "15px" }}
                  src={meta}
                  alt="kaikasLogin"
                />
                <span
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "medium",
                  }}
                >
                  Connect to Metamask
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
