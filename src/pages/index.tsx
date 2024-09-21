import ConnectWallet from "@/components/ConnectWallet";
import Form from "@/components/Form";
import WorldID from "@/components/WorldID";
import DefaultLayout from "@/layouts/default";
// import { useWalletInfo } from "@web3modal/wagmi/react";
import { useState } from "react";
// import { useAccount } from "wagmi";

export default function IndexPage() {
  const [stage, setStage] = useState("world-id");
  const [isWorldIDVerified, setIsWorldIDVerified] = useState(
    localStorage.getItem("isWorldIDVerified") === "true"
  );

  return (
    <DefaultLayout stage={stage}>
      <Form />
      {stage === "world-id" && (
        <WorldID
          isWorldIDVerified={isWorldIDVerified}
          setStage={setStage}
          setIsWorldIDVerified={setIsWorldIDVerified}
        />
      )}
      {stage === "connect-wallet" && <ConnectWallet />}
    </DefaultLayout>
  );
}
