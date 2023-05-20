import { NFTStorage } from 'nft.storage'

export const storage = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN! })
