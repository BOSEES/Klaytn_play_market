import Caver from "caver-js";
import CountABI from "../abi/CounterABI.json";
import {ACCESS_KEY_ID, ACCESS_SECRET_KEY, CHAIN_ID,COUNT_CONTRACT_ADDRESS} from "../constants";

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
const CountContact = new caver.contract(CountABI,COUNT_CONTRACT_ADDRESS);
export const readCount = async () => {
  const _count = await CountContact.methods.owner().call();
  console.log(_count);
}
export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(balance);
    return balance;
  })
}

export const mintToken = async (a,b,c) => {
  //사용할 account 설정
  try {
  const privatekey = "0x4399ac82d4acf108354ffd5b9aaea1109dbaa4e76b06efe9d052e7d2bc65957a";
  const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
  caver.wallet.add(deployer);

  const receipt = await CountContact.methods.mintWithShoesBox(a,b,c).send({
    from: deployer.address,
    gas:"0x2dc6c0"
  });
  console.log(receipt);
  } catch (error) {
    console.log(`ERROR_SET_COUNT ${error}`);
  }
}