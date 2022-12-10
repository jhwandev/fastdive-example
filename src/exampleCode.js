var exampleCodeInitial = `
    async function loginWithKaikas() {
    const klaytn = window?.klaytn;
    if (!klaytn) {
      toast.error("kaikas not available!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      try {
        const accounts = await toast.promise(
          klaytn.enable(),
          {
            pending: "Kaikas connecting",
          },
          { closeButton: true }
        );
        await signWithKaikas();
      } catch (err) {
        console.log("err :  " + err);
      }
    }
  }
    async function loginWithKaikas() {
    const klaytn = window?.klaytn;
    if (!klaytn) {
      toast.error("kaikas not available!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      try {
        const accounts = await toast.promise(
          klaytn.enable(),
          {
            pending: "Kaikas connecting",
          },
          { closeButton: true }
        );
        await signWithKaikas();
      } catch (err) {
        console.log("err :  " + err);
      }
    }
  }
      async function loginWithKaikas() {
    const klaytn = window?.klaytn;
    if (!klaytn) {
      toast.error("kaikas not available!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      try {
        const accounts = await toast.promise(
          klaytn.enable(),
          {
            pending: "Kaikas connecting",
          },
          { closeButton: true }
        );
        await signWithKaikas();
      } catch (err) {
        console.log("err :  " + err);
      }
    }
  }
  `;

var responseInitial = `{
  "token_id": 8112,
  "name": "Catbotica #8112",
  "description": "CATBOTICA is a hand-drawn, generative pfp project consisting of 12,000 2D assets called Catbots on the Ethereum blockchain as ERC-721 standard non-fungible tokens (NFTs). These 2D NFTs will grant access to special channels in the Discord, qualify the holder for various NFT airdrops, and unlock additional NFT minting capabilities which will have future utility in the proposed roadmap.",
  "external_url": "https://catbotica.com",
  "terms_of_sale": "https://catbotica.mypinata.cloud/ipfs/QmQrXjM7LTyjHVzvcrMY8QJ8m4FU17Hsxtnr6fNNphG3X6",
  "image": "https://catbotica.mypinata.cloud/ipfs/QmSzmvzdd5KV6qd3o9CJVFk5zsxtYXr8aXWh4CRzAWuTmf/8112.jpg",
  "rarity": {
    "supply": 12000,
    "rarest": {
      "score": "1.267%",
      "rank": 10551
    },
    "arithmetic": {
      "score": "34.428%",
      "rank": 8263
    },
    "geometric": {
      "score": "0.000000170970%",
      "rank": 9912
    },
    "harmonic": {
      "score": "5.200%",
      "rank": 9784
    }
  },
  "attributes": [
    {
      "trait_type": "ACCESSORY",
      "value": "None",
      "count": 4041,
      "average": 0.33675,
      "frequency": "33.675%"
    },
    {
      "trait_type": "BACK ATTACHMENT",
      "value": "None",
      "count": 4804,
      "average": 0.4003333333333333,
      "frequency": "40.033%"
    },
    {
      "trait_type": "HEADGEAR",
      "value": "Hat Pink",
      "count": 405,
      "average": 0.03375,
      "frequency": "3.375%"
    },
    {
      "trait_type": "EYES",
      "value": "Default 01",
      "count": 453,
      "average": 0.03775,
      "frequency": "3.775%"
    },
    {
      "trait_type": "HANDHELD",
      "value": "None",
      "count": 3356,
      "average": 0.2796666666666667,
      "frequency": "27.967%"
    },
    {
      "trait_type": "CLOTHING",
      "value": "T-Shirt Bee",
      "count": 217,
      "average": 0.018083333333333333,
      "frequency": "1.808%"
    },
    {
      "trait_type": "LEFT PAW",
      "value": "Chainsaw",
      "count": 574,
      "average": 0.04783333333333333,
      "frequency": "4.783%"
    },
    {
      "trait_type": "BACKGROUND",
      "value": "Gradient 05",
      "count": 579,
      "average": 0.04825,
      "frequency": "4.825%"
    },
    {
      "trait_type": "BASE",
      "value": "Blue Steel",
      "count": 489,
      "average": 0.04075,
      "frequency": "4.075%"
    },
    {
      "trait_type": "BACK",
      "value": "Back",
      "count": 12000,
      "average": 1,
      "frequency": "100.000%"
    },
    {
      "trait_type": "TAIL",
      "value": "Stripes",
      "count": 1325,
      "average": 0.11041666666666666,
      "frequency": "11.042%"
    },
    {
      "trait_type": "RIGHT SHOULDER",
      "value": "Default",
      "count": 12000,
      "average": 1,
      "frequency": "100.000%"
    },
    {
      "trait_type": "RIGHT PAW",
      "value": "Laser",
      "count": 152,
      "average": 0.012666666666666666,
      "frequency": "1.267%"
    },
    {
      "trait_type": "TORSO",
      "value": "Default",
      "count": 10932,
      "average": 0.911,
      "frequency": "91.100%"
    },
    {
      "trait_type": "LEGS",
      "value": "Shoes Yellow",
      "count": 166,
      "average": 0.013833333333333333,
      "frequency": "1.383%"
    },
    {
      "trait_type": "LEFT SHOULDER",
      "value": "Default",
      "count": 12000,
      "average": 1,
      "frequency": "100.000%"
    },
    {
      "trait_type": "HEAD",
      "value": "Default",
      "count": 12000,
      "average": 1,
      "frequency": "100.000%"
    },
    {
      "trait_type": "EARS",
      "value": "Stumpy",
      "count": 5524,
      "average": 0.4603333333333333,
      "frequency": "46.033%"
    },
    {
      "trait_type": "WHISKERS",
      "value": "Neon Yellow",
      "count": 691,
      "average": 0.057583333333333334,
      "frequency": "5.758%"
    },
    {
      "trait_type": "MUZZLE",
      "value": "Hey",
      "count": 919,
      "average": 0.07658333333333334,
      "frequency": "7.658%"
    }
  ]
}
`;

export { exampleCodeInitial, responseInitial };
