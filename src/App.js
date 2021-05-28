import logo from './logo.svg';
import Caver from "caver-js";
import './App.css';

const COUNT_CONTRACT_ADDRESS = "0x6e545d734702557757010c4F692880a6E4aa57E6";
const ACCESS_KEY_ID = "KASK0U5VB2A4W5MR77KSVJ2O";
const ACCESS_SECRET_KEY = "9N3P7e3PdLiRN5/r+cTnA4zR+HxO7e3B8VCeVkR9";
const CHAIN_ID = "1001"; // 바오밥
const COUNT_ABI = `[ { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "tokenOwner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "to", "type": "address" } ], "name": "viewTokenList", "outputs": [ { "name": "", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "shoesName", "type": "string" }, { "name": "shoesModel", "type": "string" }, { "name": "shoesSize", "type": "uint16" } ], "name": "mintWithShoesBox", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokenCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "shoesBox", "outputs": [ { "name": "name", "type": "string" }, { "name": "model", "type": "string" }, { "name": "size", "type": "uint16" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ]`;
const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + ACCESS_SECRET_KEY).toString("base64")
    },
    {name: "x-chain-id", value: CHAIN_ID}
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const CountContact = new caver.contract(JSON.parse(COUNT_ABI),COUNT_CONTRACT_ADDRESS);
const readCount = async () => {
  const _count = await CountContact.methods.owner().call();
  console.log(_count);
}
const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(balance);
    return balance;
  })
}

const mintToken = async (a,b,c) => {
  //사용할 account 설정
  try {
  const privatekey = "0x4399ac82d4acf108354ffd5b9aaea1109dbaa4e76b06efe9d052e7d2bc65957a";
  const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
  caver.wallet.add(deployer);

  const receipt = await CountContact.methods.mintWithShoesBox(a,b,c).send({
    from: deployer.address,
    gas:"0x4bfd200"
  });
  console.log(receipt);
  } catch (error) {
    console.log(`ERROR_SET_COUNT ${error}`);
  }
}

function App() {
  getBalance("0x85df9dfc7eedd81f6fce220d71f7836ab26ade1f");
  readCount();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => {mintToken("jordan","name",240)}}></button>
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
