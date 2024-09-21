import { FaCheckCircle } from "react-icons/fa";
import ConnectButton from "./Connect";
// import { useAccount } from "wagmi";

// import { Button } from "@nextui-org/button";
import { useAccount } from "wagmi";
// import { useEthersSigner } from "@/config/ethersProvider";
// import { Input } from "@nextui-org/input";
// import { Select, SelectSection, SelectItem } from "@nextui-org/react";

export default function ConnectWallet() {
  // address,
  const { isConnected } = useAccount();
  //   const signer = useEthersSigner();

  //   const [isLoading, setIsLoading] = React.useState(false);

  //   const sendTransactionFunction = async () => {
  // send transaction logic here
  // setIsLoading(true);
  // const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // const raw = {
  //   id: "66e6dae092e5dd1952968734",
  //   functionName: "increment",
  //   signerAddress: `${address}`,
  //   args: [],
  // };
  // const requestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   body: JSON.stringify(raw),
  //   redirect: "follow" as RequestRedirect,
  // };
  // const response = await fetch(
  //   "https://7866-129-126-214-63.ngrok-free.app/api/contracts/txn-data",
  //   requestOptions
  // );
  // const responseData = await response.json();
  // console.log(responseData, "responseData");
  // if (responseData?.txData as any) {
  //   await signer?.sendTransaction({
  //     to: responseData?.txData.to,
  //     data: responseData?.txData.data,
  //   });
  // }
  // setIsLoading(false);
  //   };

  const sendMessageToExtension = () => {
    // var editorExtensionId = "ipbmkbhgjdmagedkfaneidmlhpeimknf";
    // // @ts-ignore
    // chrome.runtime.sendMessage(
    //   editorExtensionId,
    //   signer,
    //   function (response: any) {
    //     console.log("key stored");
    //   }
    // );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div>
        {/* add a center text to diplay notice */}
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "grey",
            textAlign: "center",
          }}
        >
          <FaCheckCircle
            style={{
              color: "green",
              marginRight: "0.5rem",
            }}
          ></FaCheckCircle>
          Your are now verified as a human
        </span>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          {isConnected
            ? `Welcome, You are Signed In`
            : "Let's create your wallet"}
        </h1>
        <span
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
            color: "rgba(0, 0, 0, 0.6)",
            maxWidth: "400px",
          }}
        >
          {isConnected ? (
            `Connect your first contract with to create the agentx automation`
          ) : (
            <span>
              You can create a{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Reown Smart Wallet{" "}
              </span>
              to start using the platform. we recommend use email signin to
              secure your wallet.
            </span>
          )}
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <ConnectButton />
        </div>

        {isConnected}
        <div>
          {/* <Button onClick={sendMessageToExtension}>Send Message</Button> */}
        </div>
      </div>
    </div>
  );
}
