import "./App.css";
import {
  readMessage,
  decrypt,
  encrypt,
  createMessage,
  Message,
  readKey,
  unarmor,
  readArmored,
} from "openpgp";


// import { uuid } from "uuidv4";
import { useState } from "react";
const apiKey =
  "QVBJX0tFWTo4NWY2M2I0MWZiNDkwMjA0NTFjZjUzMjE2OGYyMzUxMzo1ODdhZmMwMTU3NmRlMjY1OGYyZDFmYTU1Yjk0ODQxMA";

const getKeyUrl = "";
const postDataUrl = "";
var base64 = require("base-64");

async function encryptToSomething(dataToEncrypt, { keyId, publicKey }) {
  if (!publicKey || !keyId) {
    throw new Error('Unable to encrypt data')
  }

  const decodedPublicKey = await readKey({ armoredKey: atob(publicKey) })
  const message = await createMessage({ text: JSON.stringify(dataToEncrypt) })
  return encrypt({
    message,
    encryptionKeys: decodedPublicKey,
  }).then((ciphertext) => {
    return {
      encryptedMessage: btoa(ciphertext),
      keyId,
    }
  })
}

function App() {
  const [data, setData] = useState(null);

  async function getKey() {
    const response = await fetch(getKeyUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res) {
      console.log(res);
      const publicKey = "";
      // postData(publicKey)
    }
  }

  async function postData() {
    const cardNumber = "4200000000000000";
    const cvv = 123;

    const cardDetails = {
      number: cardNumber.trim().replace(/\D/g, ""),
      cvv,
    };

    const baseKey = base64.decode(keyObj.publicKey);
    const publicKey = keyObj.publicKey;
    //------------------Card details above------------------------------
    let encryptedData = "";
    // ----------------------------------------

    encryptedData = await encryptToSomething(cardDetails, keyObj);
    // return;
    // --------------------------------------

    // const m = new openPGP.createMessage(cardDetails)
    // const jj = await openPGP.encrypt(m, keyObj)
    // console.log(m);return;

    // const message = await createMessage({ text: JSON.stringify(cardDetails) });
    // encryptedData = await encrypt({
    //   message,
    //   // passwords: keyObj.publicKey,
    //   encryptionKeys: baseKey,
    // });
    // console.log(encrypted);

    // const encryptedData = await encrypt(cardDetails, keyObj);
    // encryptedData = await encrypt({
    //   message: await createMessage({ text: JSON.stringify(cardDetails) }), // input as Message object
    //   encryptionKeys: keyObj.publicKey, // for encryption
    // });

    // const encryptedData = "";
    console.log(encryptedData);

    // ----------------End Test code here------------------------
    return;
    const reqData = {
      // idempotencyKey: uuid(),
      expMonth: 1,
      expYear: 2025,
      keyId: publicKey,
      encryptedData: encryptedData,
      billingDetails: {
        name: "Customer 0004",
        country: "US",
        district: "MA",
        line1: "Test",
        line2: "",
        city: "Test City",
        postalCode: "11111",
      },
      metadata: {
        email: "customer-0004@circle.com",
        phoneNumber: "+12025550180",
        sessionId: "xxx",
        ipAddress: "172.33.222.1",
      },
    };

    const response = await fetch(postDataUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    const res = await response.json();
    if (res) {
      console.log(res);
    }
  }

  return (
    <div className="App">
      <button
        style={{ fontSize: "28px", marginTop: "50px" }}
        onClick={postData}
      >
        Make Payment
      </button>
    </div>
  );
}

export default App;

const keyObj = {
  keyId: "key1",
  publicKey:
    "LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tCgptUUVOQkY0YzhWZ0JDQUM4QnN6WElCTytiZDZ4VnhLMUdlc3hLK2sybnlpamZ0NDdWa2xnbU80VmpTSmMzQS8yCkljeDNyWFR3S0ZIV282ckJBVUduSVhoK2ZYKzIwZGYwbld6WlNvN3ZNK0ZpMTMzVlpuTG0zalk4cVozdnR5WEMKenhqZnJ5UnlDSncrMlh6cnRGVklYT0RLSEd0RjhUSXZFNUdjdVMxclNmMGlsVUtzOWxUdXlOTEx1bXZJQ2RTeQpCMWQ3MUVCM3VDMUJpekRtaWplMHNFbjB0QXBGS3V0ZnB5aWtsbTZwWm9zWnVnYVUzL1Z3NWNkQTU5VlhHWnFpCjNTWGdzeHU1RE4zc21TU3ZVVkthMUtQd3hackZRZHQ2a3lOVUFuR0lRS3d4b3BjejAyY255R3JvZEdGU3c5TC8KbzlmeHo3Q3FpcnJvL3F6VjJzQmxFMkRvZWVLY09ZVTlzVHRCQUJFQkFBRzBCa05wY21Oc1pZa0JWQVFUQVFnQQpQaFloQlBTc3RXN3o4TkgrWVQ1MGE3S1dkbkdNTUlYQUJRSmVIUEZZQWhzREJRazRaQWtBQlFzSkNBY0NCaFVLCkNRZ0xBZ1FXQWdNQkFoNEJBaGVBQUFvSkVMS1dkbkdNTUlYQXhSQUgvM2xVL1hJbEkrZG5PR2pGRHJCTHMzcUYKN1grV0xsSU5YRmlaNWFuRC9ySnRUbGptb2R2dkhSSmlJTm1GcTRrNi90MURqcTJsdWpXTTFIUmJIaUtxTE56dQovWVJNNG5aL1lGUUd2YktqY3dNWHJDZ1Y1UFNESjZJdTE3MW4vdFFrYXFmRzd0M2ZXQzQzek10VFM4YnV6ZEtGCkQ1ai9yd0VkUjhhOXlsc0luWDdPZXlqekpUeENjQm1udmE1LzhZRFF4NFd4bk1WQWJ4ZnRRSjJzUXNJa0pNQ2MKV1d0TVZwZWlSSExlbWg1cnNhWnBnSkZ5cW1QODJXaDd0aGRkWHd3eVFGcHVUc2x6b1VKMmJaakZyMUxDSjBxRQp3MVJBOFVHaWhPUFB2SVprc2RvdFVDVDhoeXJPYU9GbUtDVUhhV0FQYzRDT3NzdVJpMU5VSGpJUVA0bVUyU0M1CkFRMEVYaHp4V0FFSUFMZFhXTUJaODlQZHFrSVRPWWZlL1pZZko4c2Nudk1PdlovQW1Vb3JpakM4M1VMdjVLbWsKSGpjVXJTR0pFYkpOdDl2NWVpc2RGOFRDNzVwZmhBLzZiOHZCUTVoMU0yT0FoUklYZGlJY1hLaTJyTXhINU9jWQo2YWFkWlVIRFIrYUZWRmtWdm53UnkxVFRDOFNleWs5UDRtd2lrTzl2RGlpMmU1SFl0R1pQcUVEWXVRN05pQnM2CktMRWpHclMwWFpieHg4WVk5enRRTUZKc2ZjdXRJd2lvTy9HcU1ZMFRKdkI0QnVJWTh2TjhPTnVubHZjb2JBYS8KcVRpYVFUcE93T3g2eElPbHB0TkFST1pncUNPZEk2R2NqMjRZRmcycEV4d0h0SjBXOFJpRDBpNEJJU0tEYkZEVAovWmlkMkptZW9vdG0vZXpaNUlDSUZNNk1wOEhDTjB6eWFSMEFFUUVBQVlrQlBBUVlBUWdBSmhZaEJQU3N0Vzd6CjhOSCtZVDUwYTdLV2RuR01NSVhBQlFKZUhQRllBaHNNQlFrNFpBa0FBQW9KRUxLV2RuR01NSVhBdmVJSC9BM1IKOTdlSENUOHdlOUFDUXkxcDJmNk41UFd6QWRaTUtQNm9QTXhpNFlCVUoyK1orNDVibnB2a0ZSdllMVjNwVFRIRApEY0N5cWh4Z0cxdEVGaVUyclZINlFzRStnWldYZkJPZU1lWHhqRkt0U0lzNktQUWViVlMrUHJhOHljK3RPakxOCkZsNlFCRjNGcGJ3YmE5L1pPbk1rbW9yTE1IV241RnJOVy9aZnVLdzhTMHFGQ29nUVNxUUVpbjZnQ0ZEd0gzK0QKQ2JzcDVKMm4xN1pncjBpcGRRYjk4MDJ1bXdDVG9aVGtwL0pwb2t4YzJTZlczaG0xUEc4M1NPUGdMUll0a3JuTApRbURYSmtDdEN6amN3eGQwdnJpVzM4Y29zQko1aVN4WHU5MEZHRWZaaGQ1Y0o4cFpKSkd2VGMrMyt6eE1sWU1HCnZmUjNvUFFoWmtwT2NyRUhlajA9Cj1BT0QzCi0tLS0tRU5EIFBHUCBQVUJMSUMgS0VZIEJMT0NLLS0tLS0K",
};
