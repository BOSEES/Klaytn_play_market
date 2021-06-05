import React, { useState } from "react";
import QRCode from "qrcode.react";
import { getBalance, readCount, setCount } from "./api/UseCaver";
import * as KlipAPI from "./api/UseKlip";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./market.css";
import { Alert, Container } from "react-bootstrap";

function onPressButton(balance) {
  console.log("hi");
}
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
};

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x00000000000000000";

function App() {
  const [nfts, setNfts] = useState([]);
  const [myBalance, setMyBalance] = useState("0");
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  // readCount();
  // getBalance('0xf3810aca8544e19559b6f06249ce5bc93376a2ad');

  const getUserData = () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      setMyAddress(address);
      const _balance = await getBalance(address);
      setMyBalance(_balance);
    })
  }

  return (
    <div className="App">
      <div style={{backgroundColor: "black", padding: 10}}>
        <div
          style={{fontSize:30,
          fontWeight:"bold",
          padding:5,
          margin:10,
        }}
        >내 지갑</div>
        {myAddress}
        <br/>
        <Alert onClick={getUserData} variant={"balance"} style={{backgroundColor: "pink", fontSize: 25}}>
          {myBalance}
        </Alert>
      </div>
      <Container style={{backgroundColor: "white",
        width: 300,
        height:300,
        padding:20
        }}
      >
        <QRCode value={qrvalue} size={256} style={{margin: "auto"}}></QRCode>
      </Container>
    </div>
  );
}

export default App;
