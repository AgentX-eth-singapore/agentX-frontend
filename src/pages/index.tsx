import ConnectWallet from "@/components/ConnectWallet";
import Form from "@/components/Form";
import WorldID from "@/components/WorldID";
import { IChain } from "@/config/chains";
import DefaultLayout from "@/layouts/default";
import { Switch } from "@nextui-org/switch";
import axios from "axios";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function IndexPage() {
  const { isConnected } = useAccount();

  const [isRegisteringSmartContract, setIsRegisteringSmartContract] =
    useState(false);
  const [stage, setStage] = useState("world-id");
  const [isWorldIDVerified, setIsWorldIDVerified] = useState(
    localStorage.getItem("isWorldIDVerified") === "true"
  );

  // Sync handler function to ensure state changes reflect in both components
  const handleToggle = () => {
    console.log("Toggling...", isRegisteringSmartContract);
    setIsRegisteringSmartContract((prev) => !prev);
    setUID("");
  };

  // const handleCall = async () => {
  //   let chatQuery = "Who are you?";
  //   let model = "o1-preview";
  //   const obj = {
  //     chatQuery,
  //     model,
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/contracts/store",
  //       obj,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [UID, setUID] = useState("");

  const handleSubmit = async (chain : IChain, contractAddress : string, isCCIPEnabled : boolean, functionName : string, isMetaTransactionEnabled : boolean, textABI : string) => {
    console.log("Submitting form...", chain, contractAddress);
    // if (!chain?.chainId || !contractAddress) {
    //   alert("Please select a chain and enter a contract address.");
    //   return;
    // }

    // let abi;
    // try {
    //   console.log(textABI.trim(), "textABI.trim()");
    //   abi = JSON.parse(textABI.trim());
    // } catch (parseError) {
    //   console.log("Invalid JSON format. Please check your input.");
    //   return;
    // }

    // Validate the parsed JSON using the ajv schema
    // const validate = ajv.compile(abiSchema);
    // const valid = validate(abi);

    // if (!valid) {
    //   console.log("ABI does not match the expected structure.");
    //   console.error(validate.errors);
    //   return;
    // }

    const payload = {
      chainId: chain?.chainIdHex,
      contractAddress,
      // contractFunctions: ["increment", "getCount"],
      ccipEnabled: isCCIPEnabled,
      functionName: isCCIPEnabled ? functionName : "",
      smartAccountEnabled: isMetaTransactionEnabled,
      abi: textABI.trim(),
    };

    try {
      setIsLoading(true);
      console.log("Payload:", payload);

      // Adding a 2-second delay
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post(
        "https://backend-contract-service.onrender.com/api/contracts/store",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response:", response);

      if (response.status === 201) {
        console.log("Contract registered successfully!");
        console.log("Response Data:", response.data);
        setUID(response.data.id);
      } else {
        console.error(
          "Error: Failed to register the contract : ",
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        "Error: An error occurred while registering the contract : ",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout stage={stage}>
      {/* <Button onClick={handleCall}>CLICK</Button> */}
      {stage === "world-id" && (
        <WorldID
          isWorldIDVerified={isWorldIDVerified}
          setStage={setStage}
          setIsWorldIDVerified={setIsWorldIDVerified}
        />
      )}
      {stage === "connect-wallet" && (
        <div className="flex h-full justify-center items-center">
          {/* Card Container with Perspective */}
          <div className="relative w-96 h-96 perspective-3d">
            {/* Card Inner Wrapper */}
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                isRegisteringSmartContract ? "rotate-y-180" : ""
              }`}
            >
              {/* Front Side */}
              <div className="absolute w-full h-full backface-hidden flex justify-center items-center bg-white shadow-lg rounded-lg flex-col">
                {stage === "connect-wallet" && <ConnectWallet />}
                <Switch
                  aria-label="Register Smart Contract"
                  className="py-8"
                  isSelected={isRegisteringSmartContract}
                  onValueChange={handleToggle}
                >
                  Are You Registering Smart Contract.
                </Switch>
              </div>

              {/* Back Side */}
              <div className="absolute flex flex-col backface-hidden bg-white border shadow-lg rounded-lg rotate-y-180 p-8">
                <Switch
                  aria-label="Register Smart Contract"
                  className="py-8"
                  isSelected={isRegisteringSmartContract}
                  onValueChange={handleToggle}
                >
                  {UID ? "GO Back!!" : "Are You Registering Smart Contract."}
                </Switch>
                {isConnected ? (
                  <Form handleSubmit={handleSubmit} isLoading={isLoading} UID={UID} />
                ) : (
                  <div>Empty</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
