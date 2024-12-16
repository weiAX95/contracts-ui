import { createConfig, http } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// 定义 Hardhat 本地网络
const hardhat = {
  id: 31337,
  name: 'Hardhat',
  network: 'hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
} as const;

export const config = createConfig({
  chains: [mainnet, goerli, hardhat],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
});
