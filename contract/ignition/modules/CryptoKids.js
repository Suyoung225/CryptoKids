const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CryptoKidsModule", (m) => {
  // Deploy the CryptoKids contract without any constructor arguments
  const cryptoKids = m.contract("CryptoKids", []);

  return { cryptoKids };
});
