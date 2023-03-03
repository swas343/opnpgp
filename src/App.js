import "./App.css";
import { readMessage, decrypt, encrypt } from "openpgp";
import { uuid } from "uuidv4";
import useState from "react";
const apiKey =
  "QVBJX0tFWTo4NWY2M2I0MWZiNDkwMjA0NTFjZjUzMjE2OGYyMzUxMzo1ODdhZmMwMTU3NmRlMjY1OGYyZDFmYTU1Yjk0ODQxMA";

const getKeyUrl = "";
const postDataUrl = "";

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

  async function postData(publicKey) {
    const cardNumber = 4200000000000000;
    const cvv = 123;

    const cardDetails = {
      number: cardNumber.trim().replace(/\D/g, ""),
      cvv,
    };
    const encryptedData = await encrypt(cardDetails);

    const reqData = {
      idempotencyKey: uuid(),
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
      <button style={{ fontSize: "28px", marginTop: "50px" }} onClick={getKey}>
        Make Payment
      </button>
    </div>
  );
}

export default App;
