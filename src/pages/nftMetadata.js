import { useState } from "react";
import Highlight from "react-highlight";
import axios from "axios";

import klaytnLogo from "../assets/klaytn_logo.png";
import etherumLogo from "../assets/eth_logo.png";
import polygonLogo from "../assets/polygon_logo.png";
import bnbLogo from "../assets/bnb_logo.png";
import boraLogo from "../assets/bora_logo.png";
import avalancheLogo from "../assets/avalanche_logo.png";
import wemixLogo from "../assets/wemix_logo.png";

import { exampleCodeInitial } from "../exampleCode.js";
//convert IPFS
function tryConvertIpfs(url) {
  if (url.indexOf("ipfs://") > -1) {
    const ipfsUrl = "https://ipfs.io/ipfs/" + url.split("ipfs://")[1];
    return ipfsUrl;
  }
  return url;
}

function NftMetadata() {
  //state
  const exampleCode = exampleCodeInitial;
  const [response, setResponse] = useState("connect your account.");
  const [responseObject, setResponseObject] = useState();
  const [chainId, setChainId] = useState("1");
  const [ownerAddress, setOwnerAddress] = useState(
    "0x46efbaedc92067e6d60e84ed6395099723252496"
  );
  const [apikey, setApikey] = useState("12ad0db3-89e7-4589-9c79-3582b3042b88");
  const [contractAddress, setContractAddress] = useState(
    "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
  );
  const [imageUrlArr, setImageUrlArr] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  //klaytn
  const { klaytn } = window;

  const imageList = imageUrlArr.map((url, index) => (
    <div
      key={index}
      style={{
        display: "inline-block",
        padding: "10px",
        backgroundColor: "black",
        borderRadius: "10px",
      }}
    >
      <img width="180px" src={url} alt="nfts" style={{ borderRadius: "0" }} />
    </div>
  ));

  /**
   * inputdata onchange event
   * set state value
   * @param {*} e
   */
  const handleChange = (e) => {
    switch (e.target.name) {
      case "contractAddress":
        setContractAddress(e.target.value);
        break;
      case "apikey":
        setApikey(e.target.value);
        break;
      case "networkSelect":
        setChainId(e.target.value);
        break;
      case "ownerAddress":
        setOwnerAddress(e.target.value);
        break;
      default:
        break;
    }
  };

  async function test() {
    setResponse("processing ...");

    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apikey,
      };
      axios
        .post(
          "https://jml6mjauvi.execute-api.ap-northeast-2.amazonaws.com/v1/nft/metadata", //deploy production
          // "https://ghqn8lq990.execute-api.ap-northeast-2.amazonaws.com/v1/nft/metadata", //deploy
          // "https://api.fast-dive.com/v1/nft/metadata",
          // "http://localhost:3000/v1/nft/metadata",
          {
            ownerAddress: ownerAddress,
            contractAddress: contractAddress,
            chainId: chainId,
          },
          {
            headers: headers,
          }
        )
        .then(function (response) {
          if (response.data.data.length > 0) {
            console.log(response.data.data);
            setResponseObject(response.data.data);
            setResponse(JSON.stringify(response.data.data));
            setIsDisabled(false);
          } else {
            setResponse("User is no have NFT balance");
            setIsDisabled(true);
          }
        })
        .catch(function (e) {
          setResponse(
            "NFT verify failed ...\n error :  \n" + JSON.stringify(e)
          );
          setIsDisabled(true);
          // console.log(error);
        });
    } catch (e) {
      setResponse("signature failed ...\n error :  \n" + JSON.stringify(e));
      setIsDisabled(true);
    }
  }

  function onClickAllButton() {
    setResponse(JSON.stringify(responseObject));
  }

  function onClickCountButton() {
    setResponse(
      "NFT_COUNT : " +
        responseObject[0].nftBalance +
        "\nLENGTH : " +
        responseObject.length
    );
    // setResponse("NFT_COUNT : " + responseObject.length);
  }

  function onClickTokenIdButton() {
    let res = "";

    for (let i = 1; i < responseObject.length; i++) {
      res += "NFT TOKEN_ID : " + responseObject[i].tokenId + "\n";
    }

    setResponse(res);
  }

  async function onClickMetadataButton() {
    let res = "";

    for (let i = 1; i < responseObject.length; i++) {
      let metadata = await axios.get(responseObject[i].metadataURI);
      res +=
        "\n\n===============  TOKEN_ID : " +
        responseObject[i].tokenId +
        "  =================\n\n";
      res += JSON.stringify(metadata.data);
    }

    // for (const item of responseObject) {
    //   let metadata = await axios.get(item.metadataURI);

    //   res +=
    //     "\n\n===============  TOKEN_ID : " +
    //     item.tokenId +
    //     "  =================\n\n";
    //   res += JSON.stringify(metadata.data);
    // }

    setResponse(res);
  }

  async function onClickNftImage() {
    let res = [];
    for (let i = 1; i < responseObject.length; i++) {
      let metadata = await axios.get(responseObject[i].metadataURI);
      const imageUrl = tryConvertIpfs(metadata.data.image);
      res.push(imageUrl);
    }
    setImageUrlArr(res);
  }

  return (
    <>
      <section className="content">
        <div>
          {/* title */}
          <div className="title"></div>
          <div
            className="title"
            style={{ marginTop: "30px", marginBottom: "60px" }}
          >
            <span>NFT METADATA</span>
          </div>

          {/* title end */}
        </div>
        <div className="flexbox">
          {/* flex item 1 */}
          <div className="item">
            &nbsp;API KEY
            <input
              className="w-input"
              name="apikey"
              onChange={handleChange}
              value={apikey}
              maxLength="100"
            />
            &nbsp;Network
            <br />
            <select
              name="networkSelect"
              className="w-selectbox"
              onChange={handleChange}
              value={chainId}
            >
              <option value="1">Ethereum [Mainnet]</option>
              <option value="8217">Klaytn [Mainnet]</option>
              <option disable value="137">
                Matic [Mainnet]
              </option>
              <option value="1001">Baobob [Klaytn Testnet] </option>
              <option value="5">Goerli [Etereum Testnet]</option>
            </select>
            <br />
            &nbsp;NFT Contract Address
            <br />
            <input
              className="w-input"
              name="contractAddress"
              onChange={handleChange}
              value={contractAddress}
              maxLength="42"
            />
            &nbsp;Owner Address
            <br />
            <input
              className="w-input"
              name="ownerAddress"
              onChange={handleChange}
              value={ownerAddress}
              maxLength="100"
            />
            <br />
            <br />
            <div style={{ display: "flex", gap: "1em" }}>
              <button className="connect-btn" onClick={test}>
                <span style={{ paddingRight: "30px", fontSize: "large" }}>
                  NFT Metadata
                </span>
              </button>
              {/* <button className="connect-btn">
                <img
                  style={{
                    flex: 1,
                    width: "30px",
                    paddingRight: "30px",
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingLeft: "20px",
                  }}
                  src={etherumLogo}
                  alt="ethereum"
                />
                <span style={{ paddingRight: "20px" }}> Ethereum NFT</span>
              </button> */}
            </div>
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <div style={{ flex: 9 }}>
                <span>&nbsp;Response</span>
              </div>
              <div style={{ flex: 1, paddingRight: 2 }}>
                <button
                  className="r-btn"
                  disabled={isDisabled}
                  onClick={onClickAllButton}
                >
                  All
                </button>
              </div>
              <div style={{ flex: 1, paddingRight: 2 }}>
                <button
                  className="r-btn"
                  disabled={isDisabled}
                  onClick={onClickCountButton}
                >
                  Count
                </button>
              </div>
              <div style={{ flex: 1, paddingRight: 2 }}>
                <button
                  className="r-btn"
                  disabled={isDisabled}
                  onClick={onClickTokenIdButton}
                >
                  TokenId
                </button>
              </div>
              <div style={{ flex: 1, paddingRight: 2 }}>
                <button
                  className="r-btn"
                  disabled={isDisabled}
                  onClick={onClickMetadataButton}
                >
                  Metadata
                </button>
              </div>
              <div style={{ paddingRight: 1 }}>
                <button
                  className="r-btn"
                  disabled={isDisabled}
                  onClick={onClickNftImage}
                >
                  Image
                </button>
              </div>
            </div>
            <textarea className="m-textarea" disabled value={response} />
          </div>
          {/* flex item 1 end */}
          {/* flex item 2 */}
          <div className="item">
            <div style={{ marginTop: "0%" }}>
              &nbsp;ExampleCode
              <div style={{ marginTop: "-8px" }}>
                <Highlight language="javascript">{exampleCode}</Highlight>
              </div>
            </div>
          </div>
          {/* flex item 2 end */}
          <div className="item" style={{ marginBottom: "5px", minHeight: "0" }}>
            NFT Images<div>{imageList}&nbsp;</div>
          </div>
        </div>
        <br />
        <div className="title" style={{ marginBottom: "20px" }}>
          <img className="img-title" src={klaytnLogo} alt="klaytnLogo" />
          &nbsp;&nbsp;
          <img className="img-title" src={etherumLogo} alt="etherumLogo" />
          &nbsp;&nbsp;
          <img className="img-title" src={polygonLogo} alt="polygonLogo" />
          &nbsp;&nbsp;
          <img className="img-title" src={bnbLogo} alt="bnbLogo" />
          &nbsp;&nbsp;
          <img className="img-title" src={boraLogo} alt="boraLogo" />
          &nbsp;&nbsp;
          <img className="img-title" src={wemixLogo} alt="wemixLogo" />
          &nbsp;&nbsp;
          <img className="img-title" src={avalancheLogo} alt="avalancheLogo" />
        </div>
      </section>
    </>
  );
}

export default NftMetadata;
