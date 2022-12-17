import { useState, useEffect } from "react";
import Highlight from "react-highlight";
import axios from "axios";

import klaytnLogo from "../assets/klaytn_logo.png";
import etherumLogo from "../assets/eth_logo.png";
import polygonLogo from "../assets/polygon_logo.png";
import bnbLogo from "../assets/bnb_logo.png";
import boraLogo from "../assets/bora_logo.png";
import avalancheLogo from "../assets/avalanche_logo.png";
import wemixLogo from "../assets/wemix_logo.png";

import { nftMetadataExampleCode } from "../exampleCode.js";

function NftMetadata() {
  //state
  const exampleCode = nftMetadataExampleCode;
  const [response, setResponse] = useState(
    "Search the NFT METADATA this owner has."
  );
  const [responseObject, setResponseObject] = useState();
  const [chainId, setChainId] = useState("1");
  const [ownerAddress, setOwnerAddress] = useState(
    "0x1361260F84BB384Bba603Ff622a141BB4EAdF8F3"
  );
  const [apikey, setApikey] = useState("12ad0db3-89e7-4589-9c79-3582b3042b88");
  const [contractAddress, setContractAddress] = useState(
    "0xed5af388653567af2f388e6224dc7c4b3241c544"
  );
  const [imageUrlArr, setImageUrlArr] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  //loading effect
  // useEffect(() => {
  //   const loadingEffect = () => {
  //     setResponse((prev) => prev + ".");
  //   };
  //   if (isLoading) {
  //     const interval = setInterval(loadingEffect, 100);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [isLoading]);

  useEffect(() => {
    const loadingEffect = () => {
      setResponse((prev) => prev + ".");
    };
    if (isLoading) {
      const interval = setInterval(loadingEffect, 100);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isLoading]);

  /**
   * ipfs일경우 형식에맞춰 convert
   * @param {string} url
   * @returns
   */
  function tryConvertIpfs(url) {
    if (url.indexOf("ipfs://") > -1) {
      const ipfsUrl = "https://ipfs.io/ipfs/" + url.split("ipfs://")[1];
      return ipfsUrl;
    }
    return url;
  }

  /**
   * NFT image map
   */
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
      case "ownerAddress":
        setOwnerAddress(e.target.value);
        break;
      default:
        break;
    }
  };

  /**
   * 데이터 조회후 처리
   * @param {object} response
   */
  function setResponseData(response) {
    setImageUrlArr([]);
    let balance = response.data.data.balance;
    let total = response.data.data.total;

    let message =
      "SUCCESS : User's NFT Metadata retrieved successfully\n\n=====================================================\n\n";

    if (balance > 0) {
      if (total < 1) {
        message =
          "WARNING : NFT 'BALANCE' retrieved successfully, But failed retrieval 'METADATA'.\n\n=====================================================\n\n";
      }

      setResponse(message + JSON.stringify(response.data.data));
      setResponseObject(response.data.data);
      setIsDisabled(false);

      //metadata 조회성공여부
      if (balance === total) {
        showNftImage(response.data.data);
      }
    } else {
      setResponse("WARNING : User's NFT balance is zero");
      setIsDisabled(true);
    }
  }

  /**
   * 특정 NFT를 보유한 owner의 NFT 갯수와 Metadata를 조회한다.
   * ownerAddress : 소유자 주소
   * contractAddress : NFT 컨트랙트 주소
   * chainId : 체인 아이디
   */
  async function getNftMetaDataByOwner() {
    setResponse("PROCESSING..");
    setIsLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apikey,
      };

      // axios.defaults.withCredentials = true;

      await axios
        .post(
          "https://api.fast-dive.com/v1/nft/metadataByOwner",
          // "https://bsxlqw5365.execute-api.ap-northeast-2.amazonaws.com/production/v1/nft/metadataByOwner",
          // "http://localhost:3000/development/v1/nft/metadataByOwner",
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
          setIsLoading(false);
          setResponseData(response);
        })
        .catch(function (e) {
          setIsLoading(false);
          setResponse(
            "NFT data Search Failed ...\n error :  \n" + JSON.stringify(e)
          );
          setIsDisabled(true);
        });
    } catch (e) {
      setResponse("signature failed ...\n error :  \n" + JSON.stringify(e));
      setIsDisabled(true);
    }
  }

  /**
   * All 버튼 클릭
   * response 모든 값 불러오기
   */
  function onClickAllButton() {
    setResponse(JSON.stringify(responseObject));
  }

  /**
   * Balance 버튼 클릭
   * NFT balance 조회
   */
  function onClickBalanceButton() {
    setResponse("NFT_BALANCE : " + responseObject.balance);
  }

  // message
  const failedMessageNoMetadata = "ERROR : NFT Metadata does not exist";

  /**
   * TokenId 버튼클릭
   * NFT tokenId 조회
   */
  function onClickTokenIdButton() {
    let res = "";
    for (let i = 0; i < responseObject.result.length; i++) {
      res += "NFT_TOKEN_ID : " + responseObject.result[i].tokenId + "\n";
    }
    setResponse(res.length < 1 ? failedMessageNoMetadata : res);
  }

  /**
   * Metadata 버튼클릭
   * NFT METADATA 조회
   */
  function onClickMetadataButton() {
    let res = "";
    for (let i = 0; i < responseObject.result.length; i++) {
      let metadata = responseObject.result[i].metadata;
      // let metadata = await axios.get(responseObject[i].metadataURI);
      res +=
        "\n\n===============  TOKEN_ID : " +
        responseObject.result[i].tokenId +
        "  =================\n\n";
      res += JSON.stringify(metadata);
    }
    setResponse(res.length < 1 ? failedMessageNoMetadata : res);
  }

  /**
   * Image 버튼 클릭
   * NFT Image 태그 호출
   */
  function onClickNftImage() {
    let imgtagArr = [];
    for (let i = 0; i < responseObject.result.length; i++) {
      let metadataImage = responseObject.result[i].metadata.image;
      const imageUrl = tryConvertIpfs(metadataImage);
      imgtagArr.push(`<img src="${imageUrl}"/>\n\n`);
    }

    setResponse(imgtagArr < 1 ? failedMessageNoMetadata : imgtagArr);
  }

  /**
   * 조회 후 NFT 이미지 조회
   * @param {object} _responseObj
   */
  function showNftImage(_responseObj) {
    let res = [];
    for (let i = 0; i < _responseObj.result.length; i++) {
      let metadataImage = _responseObj.result[i].metadata.image;
      const imageUrl = tryConvertIpfs(metadataImage);
      res.push(imageUrl);
    }
    setImageUrlArr(res);
  }
  return (
    <>
      <section className="content">
        <div>
          {/* title */}
          <div
            className="title"
            style={{
              marginTop: "70px",
              marginBottom: "60px",
            }}
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
              <option value="1001">Baobob [Klaytn Testnet] </option>
              <option value="5">Goerli [Etereum Testnet]</option>
              <option disabled value="137">
                Matic [Mainnet]
              </option>
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
              <button className="connect-btn" onClick={getNftMetaDataByOwner}>
                <span style={{ paddingRight: "30px", fontSize: "large" }}>
                  NFT Metadata
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
                  onClick={onClickBalanceButton}
                >
                  Balance
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
          {/* flex item 3 start */}
          <div
            className="item"
            style={{
              marginBottom: "5px",
              minHeight: "0",
            }}
          >
            NFT Images<div>{imageList}&nbsp;</div>
          </div>
          {/* flex item 3 end */}
        </div>
        <br />
        <div className="icons" style={{ marginBottom: "20px" }}>
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
