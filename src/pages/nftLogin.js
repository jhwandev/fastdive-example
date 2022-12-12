import { useState } from "react";
import meta from "../assets/meta.svg";
import kaikasSvg from "../assets/kaikas.svg";
import Highlight from "react-highlight";
import Caver from "caver-js";
import axios from "axios";

// logos
import klaytnLogo from "../assets/klaytn_logo.png";
import etherumLogo from "../assets/eth_logo2.png";
import polygonLogo from "../assets/polygon_logo.png";
import bnbLogo from "../assets/bnb_logo.png";
import boraLogo from "../assets/bora_logo.png";
import avalancheLogo from "../assets/avalanche_logo.png";
import wemixLogo from "../assets/wemix_logo.png";

import { exampleCodeInitial } from "../exampleCode.js";

function NftLogin() {
  //state
  const exampleCode = exampleCodeInitial;
  const [response, setResponse] = useState("\n\nconnect your account.");
  const [responseObject, setResponseObject] = useState();
  const [chainId, setChainId] = useState("8217");
  const [apikey, setApikey] = useState("12ad0db3-89e7-4589-9c79-3582b3042b88");
  const [contractAddress, setContractAddress] = useState(
    "0x7b19bf9abe4119618f69aebb78b27f73cdaa4182"
  );
  const [imageUrlArr, setImageUrlArr] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  //klaytn
  const { klaytn, ethereum } = window;

  const imageList = imageUrlArr.map((url, index) => (
    <div key={index} style={{ display: "inline-block", padding: "10px" }}>
      <img width="180px" src={url} alt="nfts" />
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
      default:
        break;
    }
  };

  /**
   * 0. 카이카스 로그인 버튼
   * @returns
   */
  async function loginWithKaikas() {
    var isConnected = await connectWithKaikas();

    //connect완료 될 경우 sign진행
    if (isConnected) {
      await signWithKaikas();
    } else {
      // alert("sign failed");
      // setResponse("sign failed");
      return false;
    }
  }

  /**
   * 1. 카이카스 <-> 웹사이트 connect 확인
   * @returns bool
   */
  async function connectWithKaikas() {
    if (!window.klaytn.isKaikas) {
      // alert("kaikas 설치 해주세요!");
      setResponse((prev) => "\n\nplease install kaikas wallet" + prev);
      return false;
    }
    setResponse((prev) => "\n\nconnect Kaikas in progress ..." + prev);
    try {
      const accounts = await window.klaytn.enable();
      setResponse((prev) => "\n\nconnect success -> " + accounts[0] + prev);
      return true;
    } catch (e) {
      // alert("connect failed");
      setResponse(
        (prev) =>
          "\n\nconnect failed ...\n error : \n" + JSON.stringify(e) + prev
      );
      return false;
    }
  }

  /**
   * 2. 카이카스 서명 및 요청
   */
  async function signWithKaikas() {
    const caver = new Caver(klaytn);
    // puuvilla 0xef45d7272211f7d9c9b3b509d550e8856cd9e050
    // sheepfarm 0xa9f07b1260bb9eebcbaba66700b00fe08b61e1e6
    // const contractAddress = "0x7b19bf9abe4119618f69aebb78b27f73cdaa4182"; //birdieshot

    setResponse((prev) => "\n\nsignature in progress ..." + prev);

    const message = "contract address : " + contractAddress;

    try {
      const signObj = await caver.klay.sign(
        message,
        window.klaytn.selectedAddress
      );
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apikey,
      };
      axios
        .post(
          "https://p6eyx3nxqj.execute-api.ap-northeast-2.amazonaws.com/v1/nft/verifyHolder",
          // "http://localhost:3000/v1/nft/verifyHolder",
          {
            sign: signObj,
            signMessage: message,
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
            setResponse(
              (prev) => "\n\n" + JSON.stringify(response.data.data) + prev
            );
            setIsDisabled(false);
          } else {
            setResponse((prev) => "\n\nUser is no have NFT balance" + prev);
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

  /**
   * 0. 메타마스크 로그인 버튼
   * @returns
   */
  async function loginWithMetamask() {
    var isConnected = await connectWithMetamask();

    //connect완료 될 경우 sign진행
    if (isConnected) {
      await signWithMetamask();
    } else {
      return false;
    }
  }

  /**
   * 1. 메타마스크 <-> 웹사이트 connect 확인
   * @returns bool
   */
  async function connectWithMetamask() {
    if (typeof window.ethereum !== "undefined") {
    } else {
      setResponse((prev) => "\nplease install Metamask" + prev);
      return false;
    }

    setResponse((prev) => "\nconnect Metamask in progress ..." + prev);

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setResponse(
        (prev) => "\nMetamask Connect Success -> " + accounts[0] + prev
      );
      return true;
    } catch (e) {
      // alert("connect failed");
      setResponse("connect failed ...\n error : \n" + JSON.stringify(e));
      return false;
    }
  }

  /**
   * 2. 메타마스크 서명 및 요청
   */
  async function signWithMetamask() {
    const caver = new Caver(window.ethereum);

    setResponse((prev) => "\nsignature in progress ..." + prev);

    const message = "contract address : " + contractAddress;

    try {
      const signObj = await caver.klay.sign(
        message,
        window.klaytn.selectedAddress
      );
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apikey,
      };
      axios
        .post(
          "http://localhost:3000/v1/nft/verifyHolder",
          {
            sign: signObj,
            signMessage: message,
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
            setResponse((prev) => "User is no have NFT balance" + prev);
            setIsDisabled(true);
          }
        })
        .catch(function (e) {
          setResponse(
            (prev) =>
              "NFT verify failed ...\n error :  \n" + JSON.stringify(e) + prev
          );
          setIsDisabled(true);
          // console.log(error);
        });
    } catch (e) {
      setResponse(
        (prev) =>
          "\n\nsignature failed ...\n error :  \n" + JSON.stringify(e) + prev
      );
      setIsDisabled(true);
    }
  }

  function onClickAllButton() {
    setResponse(JSON.stringify(responseObject));
  }

  function onClickCountButton() {
    setResponse("NFT_COUNT : " + responseObject[0].nftBalance);
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
      res.push(metadata.data.image);
    }
    setImageUrlArr(res);
  }

  return (
    <>
      <section className="content">
        <div>
          {/* title */}
          <div className="title">
            {/* <img className="img-title" src={klaytnLogo} alt="klaytnLogo" />
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
            <img
              className="img-title"
              src={avalancheLogo}
              alt="avalancheLogo"
            /> */}
          </div>
          <div
            className="title"
            style={{ marginTop: "30px", marginBottom: "60px" }}
          >
            <span>NFT HOLDER VERIFY & LOGIN</span>
          </div>

          {/* title end */}
        </div>
        <div className="flexbox">
          {/* flex item 1 */}
          <div className="item">
            {/* <br /> */}
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
              <option disabled value="137">
                Matic [Mainnet]
              </option>
              <option disabled value="1001">
                Baobob [Klaytn Testnet]{" "}
              </option>
              <option disabled value="5">
                Goerli [Etereum Testnet]
              </option>
            </select>
            <br />
            &nbsp;Fast-dive API KEY
            <input
              className="w-input"
              name="apikey"
              onChange={handleChange}
              value={apikey}
              maxLength="100"
            />
            <br />
            &nbsp;Contract Address
            <br />
            <input
              className="w-input"
              name="contractAddress"
              onChange={handleChange}
              value={contractAddress}
              maxLength="42"
            />
            <br />
            <br />
            <div style={{ display: "flex", gap: "1em" }}>
              <button className="connect-btn" onClick={loginWithKaikas}>
                <img
                  style={{
                    flex: 1,
                    width: "20px",
                    paddingRight: "30px",
                    paddingLeft: "12px",
                  }}
                  src={kaikasSvg}
                  alt="kaikasLogin"
                />
                <span style={{ paddingRight: "12px" }}> Connect to Kaikas</span>
              </button>
              <button
                disabled
                className="connect-btn"
                onClick={loginWithMetamask}
              >
                <img
                  style={{
                    flex: 1,
                    width: "30px",
                    paddingRight: "30px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  src={meta}
                  alt="kaikasLogin"
                />
                {/* <span>Connect to Metamask</span> */}
                <span>Connect to Metamask (Soon)</span>
              </button>
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
            <textarea className="w-textarea" disabled value={response} />
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
        </div>

        <div>{imageList}</div>

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

export default NftLogin;
