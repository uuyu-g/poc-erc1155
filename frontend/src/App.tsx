import { useEffect, useState } from "react";
import "./App.css";
import { ethers, BigNumberish } from "ethers";
import GameItemsJson from "../../artifacts/contracts/GameItems.sol/GameItems.json";
import { GameItems } from "../../typechain/GameItems";

const contractAddress = "0x0165878a594ca255338adfa4d48449f69242eb8f";

const getGameItemsContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    GameItemsJson.abi,
    signer
  ) as GameItems;

  return contract;
};

const useCurrentAddress = () => {
  const [currentAddress, setCurrentAddress] = useState<string>(
    window.ethereum.selectedAddress
  );

  useEffect(() => {
    window.ethereum.on("accountsChanged", ([newAddress]: string[]) => {
      setCurrentAddress(newAddress);
    });
  }, []);

  return { currentAddress };
};

function App() {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState("0");
  const { currentAddress } = useCurrentAddress();

  useEffect(() => {
    (async () => {
      if (currentAddress) {
        const contract = getGameItemsContract();
        const b = await contract.balanceOf(currentAddress, 0);
        setBalance(b.toString());
      }
    })();
  }, [currentAddress]);

  const getToken = async (tokenId: BigNumberish, amount: number) => {
    const contract = getGameItemsContract();
    const tx = await contract.faucet(tokenId, amount);
    await tx.wait();
    const b = await contract.balanceOf(currentAddress, 0);
    setBalance(b.toString());
  };

  // const handleConnect = async () => {
  //   const [account] = await window.ethereum.request!({
  //     method: "eth_requestAccounts",
  //   });

  //   setCurrentAddress(account);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(amount);
    await getToken(0, amount);
    setAmount(0);
  };

  return (
    <div className="App">
      <h1>GameItems Faucet 🚰</h1>
      {/* <button onClick={handleConnect}>Connect</button> */}
      <p>{currentAddress}</p>
      <p>{balance}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          id="amount"
          onChange={handleChange}
        />
        <button type="submit">GET</button>
      </form>
    </div>
  );
}

export default App;
