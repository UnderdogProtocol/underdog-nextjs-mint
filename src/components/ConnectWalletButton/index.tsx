import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal, WalletIcon } from "@solana/wallet-adapter-react-ui";
import { HiOutlineWallet } from "react-icons/hi2";

import { Button, ButtonProps } from "../Button";

type ConnectWalletButtonProps = ButtonProps;

export function ConnectWalletButton({
  size,
  type,
  ...buttonProps
}: ConnectWalletButtonProps) {
  const { wallet, connect, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  if (!wallet) {
    return (
      <Button
        type={type}
        onClick={() => setVisible(true)}
        {...buttonProps}
        size={size}
      >
        <div className="flex items-center space-x-2">
          <HiOutlineWallet className="text-2xl" />
          <span>Select a Wallet</span>
        </div>
      </Button>
    );
  }

  if (!publicKey) {
    return (
      <Button size={size} type={type} onClick={connect} {...buttonProps}>
        <div className="flex items-center space-x-2">
          <WalletIcon
            wallet={wallet}
            className="h-6 w-6"
          />
          <span>Connect Wallet</span>
        </div>
      </Button>
    );
  }
}
