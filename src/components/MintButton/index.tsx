import axios from "axios";
import { Button, ButtonProps } from "../Button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { base64 } from "@metaplex-foundation/umi/serializers";
import { VersionedTransaction } from "@solana/web3.js";
import { renderNotification } from "../Notification";
import { useToggle } from "@/hooks/useToggle";
import { useBalance } from "@/hooks/useBalance";
import { usePrice } from "@/hooks/usePrice";
import { useAllEscrowedAssets } from "@/hooks/useAllEscrowedAssets";

type MintButtonProps = ButtonProps;

export const MintButton: React.FC<MintButtonProps> = (buttonProps) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const price = usePrice();

  const { data: balance, isLoading: isLoadingBalance } = useBalance();
  const { data: escrowedAssets, isLoading: isLoadingEscrowedAssets } =
    useAllEscrowedAssets();

  const [loading, toggleLoading] = useToggle();

  const handleMint = async () => {
    if (wallet.publicKey && wallet.signTransaction) {
      toggleLoading();

      try {
        const response = await axios.post("/api/mint", {
          account: wallet.publicKey.toBase58(),
        });

        const transaction = VersionedTransaction.deserialize(
          base64.serialize(response.data.transaction)
        );

        await wallet.sendTransaction(transaction, connection);

        renderNotification({
          title: "Successfully minted",
          description: "Check your wallet for the new NFT",
        });
      } catch (e) {
        renderNotification({
          title: "Failed to mint",
          description: "Please sign the transaction to mint",
        });
      }

      toggleLoading();
    }
  };

  const enoughSol = balance && balance > price;
  const soldOut = escrowedAssets?.length === 0;

  return (
    <Button
      onClick={handleMint}
      loading={loading}
      disabled={soldOut || !enoughSol || loading}
      {...buttonProps}
    >
      {soldOut
        ? "Sold Out"
        : !enoughSol
        ? "Not enough SOL"
        : buttonProps.children}
    </Button>
  );
};
