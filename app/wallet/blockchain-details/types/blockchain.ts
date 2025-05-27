export interface BlockchainTransaction {
    id: string
    hash: string
    status: "success" | "pending" | "failed"
    block: number
    confirmations: number
    timestamp: string
    from: string
    to: string
    value: string
    fee: string
    gasPrice: string
    gasUsed: number
    gasLimit: number
    nonce: number
}
