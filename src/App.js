import "./App.css";
import { readMessage, decrypt, encrypt } from "openpgp";
import useState from "react";

function App() {
  const [data, setData] = useState(null);

  async function postData() {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res) {
      console.log(res);
    }
  }

  return (
    <div className="App">
      <button style={{ fontSize: "28px", marginTop: "50px" }} onClick={postData}>
        Make Payment
      </button>
    </div>
  );
}

export default App;
