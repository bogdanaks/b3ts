import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

import "./tasks/seeding"

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: "22f884de-2e05-4552-8402-bc45bb63d5ed",
    token: "ETH",
  },
}

export default config
