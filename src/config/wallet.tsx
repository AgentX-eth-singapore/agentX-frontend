
// config/index.tsx

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia, rootstock, flowMainnet,optimismSepolia, morphHolesky,  } from 'wagmi/chains'

// Your Reown Cloud project ID
export const projectId = '2e373bd7281585c0b20e47bc2e15419e'

// Create a metadata object
const metadata = {
    name: 'AgentX',
    description: 'AppKit Example',
    url: 'https://reown.com/appkit', // origin must match your domain & subdomain
    icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// Create wagmiConfig
const chains = [mainnet, rootstock, flowMainnet,optimismSepolia, morphHolesky, {
    ...sepolia, rpcUrls: {
        default: {
            http: ['https://ethereum-sepolia-rpc.publicnode.com'],
        },
    },
}] as const
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
})