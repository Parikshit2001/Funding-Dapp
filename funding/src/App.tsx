import { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [reload, shouldReload] = useState(false);

  const realoadEffect = () => {
    shouldReload(!reload);
  };

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Funder", provider);
      console.log({ contract });
      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        console.error("Please install metamask");
      }
      // if (window.ethereum) {
      //   provider = window.ethereum;
      //   try {
      //     await provider.enable();
      //   } catch {
      //     console.error("User is not allowed");
      //   }
      // } else if (window.web3) {
      //   provider = window.web3.currentProvider;
      // } else if (!process.env.production) {
      //   provider = new Web3.providers.HttpProvider("http://localhost:7545");
      // }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      const { web3, contract } = web3Api;
      const bal = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(bal, "ether"));
    };
    web3Api.web3 && loadBalance();
  }, [web3Api, account, reload]);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  const transferFund = async () => {
    const { web3, contract } = web3Api;
    await contract.transfer({
      from: account,
      value: web3.utils.toWei("2", "ether"),
    });
    realoadEffect();
  };

  const withdrawFund = async () => {
    const { web3, contract } = web3Api;
    const withdrawAmount = web3.utils.toWei("2", "ether");
    await contract.withdraw(withdrawAmount, { from: account });
    realoadEffect();
  };

  return (
    <div className="text-center">
      <nav className="w-full bg-gray-100 px-auto py-8">
        <h1 className="text-xl">Funding</h1>
      </nav>
      <section className="py-5 space-y-5">
        <div>
          <p className="text-2xl font-semibold">
            Balance: {balance ? balance : ""} ETH
          </p>
          <p>Account: {account ? account : ""}</p>
        </div>
        <div className="space-x-3">
          {/* <button className="bg-green-500 text-white rounded-md px-4 py-2">
            Connect to metamask
          </button> */}
          <button
            className="bg-green-500 text-white rounded-md px-4 py-2"
            onClick={transferFund}
          >
            Transfer
          </button>
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2"
            onClick={withdrawFund}
          >
            Withdraw
          </button>
        </div>
      </section>
      <footer className="w-full bg-gray-100 px-auto py-8">
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
