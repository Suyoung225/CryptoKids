import React, { useState, useEffect } from 'react';
import CryptoKidsABI from './CryptoKidsABI.json';
import './styles.css';

const { ethers } = require("ethers"); // https://docs.ethers.org/v5/getting-started

const CryptoKids = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [kids, setKids] = useState([]);

  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send('eth_requestAccounts', []);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, CryptoKidsABI, signer);

          setProvider(provider);
          setSigner(signer);
          setContract(contract);
          setAccount(accounts[0]);

          // Load kids data
          const kidsData = await loadKids(contract);
          setKids(kidsData);
        } catch (error) {
          console.error('Error connecting to MetaMask', error);
        }
      } else {
        console.error('MetaMask is not installed');
      }
    };
    init();
  }, []);

  const loadKids = async (contract) => {
    const kidsCount = await contract.kidsCount();
    const kids = [];
    for (let i = 0; i < kidsCount; i++) {
      const kid = await contract.kids(i);
      kids.push(kid);
    }
    return kids;
  };

  const addKid = async (walletAddress, firstName, lastName, releaseTime, amount) => {
    try {
      const tx = await contract.addKid(walletAddress, firstName, lastName, releaseTime, ethers.parseUnits(amount, "ether"), false);
      await tx.wait();
      alert('Kid added successfully!');
      const kidsData = await loadKids(contract);
      setKids(kidsData);
    } catch (error) {
      console.error('Error adding kid', error);
    }
  };

  const deposit = async (walletAddress, amount) => {
    try {
      const tx = await contract.deposit(walletAddress, { value: ethers.parseUnits(amount, "ether") });
      await tx.wait();
      alert('Deposit successful!');
    } catch (error) {
      console.error('Error making deposit', error);
    }
  };

  const withdraw = async (walletAddress) => {
    try {
      const tx = await contract.withdraw(walletAddress);
      await tx.wait();
      alert('Withdrawal successful!');
    } catch (error) {
      console.error('Error making withdrawal', error);
    }
  };

  return (
    <div className="container">
      <h1>CryptoKids DApp</h1>
      <p>Connected account: {account}</p>

      <h2>Add Kid</h2>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target;
        const walletAddress = form.walletAddress.value;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const releaseTime = Math.floor(new Date(form.releaseTime.value).getTime() / 1000);
        const amount = form.amount.value;
        await addKid(walletAddress, firstName, lastName, releaseTime, amount);
      }}>
        <input type="text" name="walletAddress" placeholder="Kid's Wallet Address" required />
        <input type="text" name="firstName" placeholder="First Name" required />
        <input type="text" name="lastName" placeholder="Last Name" required />
        <input type="datetime-local" name="releaseTime" required />
        <input type="number" name="amount" placeholder="Amount in Ether" required />
        <button type="submit">Add Kid</button>
      </form>

      <h2>Deposit</h2>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target;
        const walletAddress = form.walletAddress.value;
        const amount = form.amount.value;
        await deposit(walletAddress, amount);
      }}>
        <input type="text" name="walletAddress" placeholder="Kid's Wallet Address" required />
        <input type="number" name="amount" placeholder="Amount in Ether" required />
        <button type="submit">Deposit</button>
      </form>

      <h2>Withdraw</h2>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target;
        const walletAddress = form.walletAddress.value;
        await withdraw(walletAddress);
      }}>
        <input type="text" name="walletAddress" placeholder="Kid's Wallet Address" required />
        <button type="submit">Withdraw</button>
      </form>

      <h2>Kids</h2>
      {kids.map((kid, index) => (
        <div key={index} className="kid-card">
          <h3>{kid.firstName} {kid.lastName}</h3>
          <p>Wallet Address: {kid.walletAddress}</p>
          <p>Release Time: {new Date(kid.releaseTime * 1000).toLocaleString()}</p>
          <p>Amount: {ethers.utils.formatEther(kid.amount)} ETH</p>
          <p>Can Withdraw: {kid.canWithdraw ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default CryptoKids;
