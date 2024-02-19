import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { Container } from "@/components/Container";
import { LoadingPage } from "@/components/LoadingPage";
import { MediaObject } from "@/components/MediaObject";
import { MintButton } from "@/components/MintButton";
import ProgressBar from "@/components/ProgressBar";
import { useAllEscrowedAssets } from "@/hooks/useAllEscrowedAssets";
import { useAsset } from "@/hooks/useAsset";
import { useCollectionMintAddress } from "@/hooks/useCollectionMintAddress";
import { useMetadata } from "@/hooks/useMetadata";
import { usePrice } from "@/hooks/usePrice";
import { isSome } from "@metaplex-foundation/umi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

export const IndexView: React.FC = () => {
  const wallet = useWallet();

  const collectionMintAddress = useCollectionMintAddress();
  const price = usePrice();

  const { data } = useAsset(collectionMintAddress);
  const { data: metadataData } = useMetadata(collectionMintAddress);

  const total = useMemo(
    () =>
      metadataData && isSome(metadataData.collectionDetails)
        ? Number(metadataData.collectionDetails.value.size)
        : 0,
    [metadataData]
  );

  const { data: escrowedAssetsData } = useAllEscrowedAssets();

  if (!metadataData) return <LoadingPage />;

  const animationFile = data?.content?.files?.find(
    ({ mime }) => mime === "video/mp4"
  );

  const imageFile = data?.content?.files?.find(
    ({ mime }) => mime === "image/png"
  );

  return (
    <Container className="grid gap-8 py-32 lg:grid-cols-2">
      <div className="px-4 lg:px-24">
        {animationFile ? (
          <video loop autoPlay muted playsInline>
            <source src={animationFile.uri} />
          </video>
        ) : (
          <img src={imageFile?.uri} />
        )}
      </div>

      <div className="px-16">
        <Card className="space-y-8 p-8">
          <MediaObject title={metadataData?.name} size="4xl" />

          <div className="space-y-2">
            <MediaObject
              title={`${price} SOL`}
              description={
                !escrowedAssetsData
                  ? "Loading..."
                  : `${total - escrowedAssetsData.length} / ${total}`
              }
            />

            <ProgressBar
              total={total}
              current={
                escrowedAssetsData ? total - escrowedAssetsData.length : 0
              }
            />
          </div>

          {wallet.publicKey ? (
            <div>
              <MintButton type="primary" block size="lg">
                Mint
              </MintButton>

              <Button
                block
                type="link"
                className="text-primary"
                onClick={() => wallet.disconnect()}
              >
                Connect a different wallet
              </Button>
            </div>
          ) : (
            <ConnectWalletButton type="primary" block size="lg" />
          )}
        </Card>
      </div>
    </Container>
  );
};
