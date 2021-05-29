import axios from "axios";

export const getAddress = (setQrvalue) => {
  axios.post("https://a2a-api.klipwallet.com/v2/a2a/prepare", {
    bapp: {
      name: "KLAY_MARKET",
    },
    type: "auth"
  }).then((response) => {
    const request_key = response.data.request_key;
    console.log(request_key)
    const qrcode =`https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
    setQrvalue(qrcode);
    let timedId = setInterval(() => {
      axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`)
      .then((response) => {
        if (response.data.result) {
          console.log(`${JSON.stringify(response.data.result)}`);
          clearInterval(timedId)
        }
      })
    },1000)
  })
}

