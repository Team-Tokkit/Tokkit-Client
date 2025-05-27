import { BlockchainTransaction } from "@/app/wallet/blockchain-details/types/blockchain"
import {fetchWithAuth} from "@/lib/fetchWithAuth";
import {getApiUrl} from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export async function fetchTxDetail(txHash: string): Promise<BlockchainTransaction> {
    const res = await fetchWithAuth(`${API_URL}/api/users/wallet/tx/${txHash}`)

    const data = await res.json()

    if (!res.ok || !data.isSuccess) {
        throw new Error(data.message || "트랜잭션 조회 실패")
    }

    return data.result as BlockchainTransaction
}