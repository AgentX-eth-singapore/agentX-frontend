// Define the Chain type with specific fields
export interface IChain {
  name: string;
  chainId: number;
  chainIdHex: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  logo: JSX.Element | string;
  token: string;
}

// Define SVG components for each logo
const MorphLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="w-4 h-4 text-[#14A800]"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 32h11.02V15.474c0-.534.768-.616.881-.095l2.6 11.934h6.612v-4.107c0-.247.2-.446.446-.446H32V0H20.98v4.107c0 .246-.199.446-.445.446H9.542l.904 4.146a.446.446 0 01-.436.541H0V32z"
      clipRule="evenodd"
    ></path>
  </svg>
);

// Define and export the chains array with proper types
export const chains: IChain[] = [
  {
    name: "Morph Holesky",
    chainId: 2810,
    chainIdHex: "0xafa",
    rpcUrl: "https://rpc-holesky.morphl2.io",
    explorerUrl: "https://explorer-holesky.morphl2.io/",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    logo: <MorphLogo />,
    token: "ETH",
  },
  {
    name: "Sepolia",
    chainId: 11155111,
    chainIdHex: "0xaa36a7",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    explorerUrl: "https://sepolia.etherscan.io",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    logo: 'https://etherscan.io/images/svg/brands/ethereum-original.svg',
    token: "ETH",
  },
  {
    name: "Optimism Sepolia",
    chainId: 11155420,
    chainIdHex: "0xaa37dc",
    rpcUrl: "https://optimism-sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    explorerUrl: "https://optimism.etherscan.io",
    nativeCurrency: {
      name: "Optimism Sepolia Ether",
      symbol: "ETH",
      decimals: 18,
    },
    logo: 'https://sepolia-optimism.etherscan.io/assets/opsepolia/images/svg/logos/chain-light.svg?v=24.9.2.0',
    token: "ETH",
  },
  {
    name: "AirDAO",
    chainId: 16718,
    chainIdHex: "0x414e",
    rpcUrl: "https://network.ambrosus.io",
    explorerUrl: "https://explorer.ambrosus.io",
    nativeCurrency: { name: "Amber", symbol: "AMB", decimals: 18 },
    logo: 'https://airdao.io/_next/image?url=https%3A%2F%2Fnew-airdao-website.cdn.prismic.io%2Fnew-airdao-website%2FZnWkB5bWFbowexMt_stake-icon.svg%3Fauto%3Dcompress%2Cformat&w=96&q=75',
    token: "AMB",
  },
  {
    name: "Flow",
    chainId: 747,
    chainIdHex: "0x2eb",
    rpcUrl: "https://access-mainnet.onflow.org",
    explorerUrl: "https://flowscan.org",
    nativeCurrency: { name: "Flow Token", symbol: "FLOW", decimals: 8 },
    logo: 'https://cryptologos.cc/logos/flow-flow-logo.png?v=035',
    token: "FLOW",
  },
];
