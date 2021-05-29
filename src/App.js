import logo from './logo.svg';
import './App.css';
import {readCount, getBalance, mintToken} from "./api/UserCaver";
import QRCode from "qrcode.react";
import { useState } from 'react';
import * as klipAPI from "./api/UserKlip";

const DEFAULT_QR_CODE = "DEFAULT";

function App() {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  // getBalance("0x85df9dfc7seedd81f6fce220d71f7836ab26ade1f");
  // readCount();

  const onClickAddress = () => {
    klipAPI.getAddress(setQrvalue);
  }
  return (
    <div className="App">
      <header className="App-header">
        <QRCode value={qrvalue} />
        <br/>
        <br/>
        <br/> 
        <button onClick={onClickAddress}> 주소 가져오기</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> 
    </div>
  );
}

export default App;
