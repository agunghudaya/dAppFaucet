
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthProvider from '@metamask/detect-provider'
import { loadContract } from "./utils/load-contract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  })

  const [balance, setBalance] = useState(null)
  const [account, setAccount] = useState(null)

 
  useEffect(() => {
    
    const loadBalance = async () => {
      const { contract, web3 } = web3Api

      if (contract) {
        const balance = await web3.eth.getBalance(contract.options.address)
        setBalance(web3.utils.fromWei(balance, "ether"))
      }
    }

    if (web3Api) {
      loadBalance();
    }
   
  },[web3Api, balance])

  useEffect(() => {
    const loadProvider = async () => {
      
      const provider = await detectEthProvider()

      if (provider) {
        const web3 = new Web3(provider)
        const contract = await loadContract("Faucet", web3) 

        setWeb3Api({
          web3, 
          provider,
          contract
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
  
  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api
    
    await contract.methods.addFunds()
    .send({
      from: account,
      value: web3.utils.toWei("1","ether")
    })
   
    setBalance("~")
  }, [web3Api, account])

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
            Current Balance: <strong>{balance} ETH</strong>
          </div>
          <button 
            className='button is-link mr-2'
            onClick={addFunds}
          >
            Donate 1 ETH
          </button>
          <button className='button is-primary'>Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
