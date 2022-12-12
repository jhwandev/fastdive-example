var exampleCodeInitial = `import Caver from "caver-js";
import axios from "axios";

async function signWithKaikas() {

  const caver = new Caver(window.klaytn);

  const contractAddress = 
  "0x7b19bf9abe4119618f69aebb78b27f73cdaa4182";
  
  const message = "contract address : " + contractAddress;
  
  // Sign object
  const signObj = await caver.klay.sign(
    message,
    window.klaytn.selectedAddress
  );

  // api header
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apikey,
  };
  
  // requeset
  axios.post(
      "http://api.fast-dvie.com/v1/nft/verifyHolder",
      {
        sign: signObj,
        signMessage: message,
        contractAddress: contractAddress,
        chainId: "klaytn",
      },
      {
        headers: headers,
      }
    )
    .then(function (response) {
      if(response.data.data[0].nftBalance > 0) {
        // login success
        // nft data
        console.log(response.data.data);
      }else{
        // login failed
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}`;

export { exampleCodeInitial };
