
import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthProvider from '@metamask/detect-provider'

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null
  })

  const [account, setAccount] = useState(null)
 
  useEffect(() => {
    const loadProvider = async () => {

      const provider = await detectEthProvider()

      if (provider) {
        setWeb3Api({
          web3: new Web3(provider), provider
        })
      } else {
        console.error("Please install metamask!")
      }
    }
    loadProvider()
  }, [])

  useEffect(() => {
    const getAccounts = async () => {
        const accounts = await web3Api.web3.eth.getAccounts()
        setAccount(accounts[0]);
    }

    web3Api.web3 && getAccounts()

  }, [web3Api.web3])


  

  return (
    <>
      <div className='faucet-wrapper'>
        <div className='faucet'>
          <div className="is-flex is-align-items-center">
            <strong className="mr-2">Account: </strong>
            <h1>{ 
              account ? 
              account : 
              <button className='button is-small' onClick={() => 
                web3Api.provider.request({method: "eth_requestAccounts"})}>
                Connect</button> }
            </h1>
          </div >
          <div className='balance-view is-size-2 mb-4'>
            Current Balance: <strong>10</strong>
          </div>
          <button className='button is-link mr-2'>Donate</button>
          <button className='button is-primary'>Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
