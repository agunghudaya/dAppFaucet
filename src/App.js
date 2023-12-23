
import { useEffect } from "react";
import "./App.css";

function App() {

  useEffect(() => {
    const loadProvider = async () => {

    }
     loadProvider()
  }, [])


  return (
    <>
      <div className='faucet-wrapper'>
        <div className='faucet'>
          <div className='balance-view is-size-2'>
            Current Balance: <strong>10</strong>
          </div>
          <button
            className="btn mr-2"
            onClick={async () => {
              const account = await window.ethereum.request({method: "eth_requestAccounts"})
              console.log(account)
            }}
          >
            Enable ETH
          </button>

          <button className='btn mr-2'>Donate</button>
          <button className='btn mr-2'>Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
