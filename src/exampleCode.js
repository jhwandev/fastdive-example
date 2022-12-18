var exampleCodeInitial = `import Caver from "caver-js";
import { v4 } from "uuid";
import axios from "axios";

async function signWithKaikas() {

  const caver = new Caver(window.klaytn);

  // 1. Contract Address
  const contractAddress = "0x7b19bf9abe.....3cdaa4182";
  
  // 2. sign Message
  const message = "contract address : " + contractAddress;
  
  // 3. Sign object

  // 3-1. kaikas
  const signObj = await caver.klay.sign(
    message,
    window.klaytn.selectedAddress
  );

  // 3-2. metamask
  const signObj = await window.ethereum.request({
    method: "personal_sign",
    params: [message, window.ethereum.selectedAddress, v4()],
  });

  // 4. ChainId
  const chainId = '8217'; // or '1' ...

  // 5. walletType
  const walletType = 'kaikas'; // or 'metamask'

  // 6. onlyBalance
  cosnt onlyBalance = false // or true 

  // 7. header
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apikey,
  };
  
  axios
    .post(
      "http://api.fast-dvie.com/v1/nft/verifyHolder",
      {
        contractAddress: contractAddress,
        signMessage: message,
        sign: signObj,
        chainId: chainId,
        walletType: walletType,
        onlyBalance: onlyBalance,
      },
      {
        headers: headers,
      }
    )
    .then(function (response) {

      const data = response.data.data;

      // NFT Balance
      const balance = data.balance;
      
      // result (NFT TokenInfo, metadata)
      const result = data.result;

      if(balance < 1){
        console.log('Failed - NFT Balance is zero');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}`;

var nftMetadataExampleCode = `import axios from "axios";

async function getNftData() {

  // 1. OwnerAddress
  const ownerAddress = '0x1361260F84.....1BB4EAdF8F3';

  // 2. ContractAddress
  const contractAddress = "0xed5af388653.....4b3241c544";

  // 3. ChainId
  const chainId = '8217'; // or '1' ...

  // 4. OnlyBalance
  const onlyBalance = false;

  // 5. header
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apikey,
  };

    axios
      .post(
        "https://api.fast-dive.com/v1/nft/metadata",
        {
          ownerAddress: ownerAddress,
          contractAddress: contractAddress,
          chainId: chainId,
          onlyBalance: onlyBalance
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        const data = response.data.data;

        // NFT Balance
        const balance = data.balance;
        
        // NFT Metadata Count (Array Length)
        const total = data.total;
        
        // result (NFT TokenInfo, metadata)
        const result = data.result;

        if(balance < 1){
          console.log('NFT Balance is zero');
        }
      })
      .catch(function (e) {
        console.log(e)
      });

}
`;

export { exampleCodeInitial, nftMetadataExampleCode };
