import { useState } from 'react';
import './App.css';
import axios from 'axios';

//RBPZ7PVFQJJUNZSZZEA2Q2IR5VJASFJRX3F64KKVXQR6H26E67F3AXTKWY
//IGYIX67ZJ43LDD32QFHA4544AHDT7B3S37BGF6UIXTFJHNQSD7EIQX47X2SYEU2G4ZM4SANINEI62UQJCUY35S7OFFK3YI7D5PCPPSY


function App() {
  const [address,setaddress]=useState()
  const [id,setid]=useState()
  const [hash,sethash]=useState()
  const [asset,setasset]=useState([])
  async function wallet(){
    
const options = {
  method: 'GET',
  url: 'https://api-eu1.tatum.io/v3/algorand/wallet',
  headers: {'Content-Type': 'application/json', 'x-api-key': '9439d677-f41a-445c-88c3-dcd87931a698'},
  // data: {
  //   value: 0,
  //   tokenId: "1",
  //   chain: 'ALGO',
  //   to: 'RBPZ7PVFQJJUNZSZZEA2Q2IR5VJASFJRX3F64KKVXQR6H26E67F3AXTKWY',
  //   contractAddress: "50112874",
  //   "fromPrivateKey": ""
  // }
};
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
  function balance(){
    const options = {
      method: 'GET',
      url: 'https://api-eu1.tatum.io/v3/algorand/account/balance/RBPZ7PVFQJJUNZSZZEA2Q2IR5VJASFJRX3F64KKVXQR6H26E67F3AXTKWY',
      headers: {'Content-Type': 'application/json', 'x-api-key': '9439d677-f41a-445c-88c3-dcd87931a698'}
    };
    axios.request(options).then(function (response) {
      console.log(response.data);

    }).catch(function (error) {
      console.error(error);
    });
  }
  function deploy(){
    const options = {
      method: 'POST',
      url: 'https://api-eu1.tatum.io/v3/nft/deploy',
      headers: {'Content-Type': 'application/json', 'x-api-key': '0fb0cb51-0e27-4107-be3a-e755070c9a6d'},
      data: {
        chain: 'ALGO',
        name: 'MY ALGO NFT',
        symbol: 'MAN',
        fromPrivateKey: 'IGYIX67ZJ43LDD32QFHA4544AHDT7B3S37BGF6UIXTFJHNQSD7EIQX47X2SYEU2G4ZM4SANINEI62UQJCUY35S7OFFK3YI7D5PCPPSY',
        url: "ipfs://Qmdkg1Y6HxzrE3dw6oGJmFBaVxJH7jX7snVkG5c12MRpae"
        //3MMJH2ZXDNHJVAEYKNGHSN5XG2ZMJNEY27SS6B6HUG4BMSPJ56OA
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data.txId);
      sethash(response.data.txId)
    }).catch(function (error) {
      console.error(error);
    });
  }
  function getassetid(){
    
        const options = {
          method: 'GET',
          url: `https://api-eu1.tatum.io/v3/nft/address/balance/ALGO/RBPZ7PVFQJJUNZSZZEA2Q2IR5VJASFJRX3F64KKVXQR6H26E67F3AXTKWY`,
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '0fb0cb51-0e27-4107-be3a-e755070c9a6d'
          }
        };

        axios.request(options).then(function (response) {
          console.log(response.data);
          let a =[];
          for(let i =0;i< response.data.length;i++)
          {
            a.push(response.data[i].contractAddress)
            console.log(a)
          }
          setasset(a)
        }).catch(function (error) {
          console.error(error);
        });
  }
  async function sendnft(){
    console.log(address,id)
    const options = {
      method: 'POST',
      url: 'https://api-eu1.tatum.io/v3/nft/transaction',
      headers: {
        'Content-Type': 'application/json',
        'x-testnet-type': '',
        'x-api-key': '0fb0cb51-0e27-4107-be3a-e755070c9a6d'
      },
      data: {
        value: '1',
        chain: 'ALGO',
        tokenId: '1',
        to: address,
        contractAddress: id,
        fromPrivateKey: 'IGYIX67ZJ43LDD32QFHA4544AHDT7B3S37BGF6UIXTFJHNQSD7EIQX47X2SYEU2G4ZM4SANINEI62UQJCUY35S7OFFK3YI7D5PCPPSY'
      }
    };
    
    await axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={wallet}>My wallet</button>
        <button onClick={balance}>balance</button>
        <button onClick={deploy}>deplouy</button>
        <button onClick={getassetid}>getassetid</button>
        <div>{asset.map((ass)=><li>{ass}</li>)}</div>
        <label>address</label>
        <input value={address} onChange={e=>{setaddress(e.target.value)}}></input>
        <label>asset id</label>
        <input value={id} onChange={e=>{setid(e.target.value)}}></input>
        <button onClick={sendnft}>receivenft</button>
      </header>
    </div>
  );
}

export default App;
