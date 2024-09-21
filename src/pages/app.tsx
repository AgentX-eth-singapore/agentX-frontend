import { Switch } from "@nextui-org/switch";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

import ConnectWallet from "@/components/ConnectWallet";
import ENSForm from "@/components/ENSForm";
import Form from "@/components/Form";
import WorldID from "@/components/WorldID";
import { IChain } from "@/config/chains";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const { isConnected, address, chain } = useAccount();

  const [isRegisteringSmartContract, setIsRegisteringSmartContract] =
    useState(false);
  const [ens, setEns] = useState<string>("");
  const [stage, setStage] = useState("world-id");
  const [isWorldIDVerified, setIsWorldIDVerified] = useState(
    localStorage.getItem("isWorldIDVerified") === "true",
  );
  const [ensHash, setEnsHash] = useState("");

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

  const handleSubmit = async (
    chain: IChain,
    contractAddress: string,
    isCCIPEnabled: boolean,
    functionName: string,
    isMetaTransactionEnabled: boolean,
    textABI: string,
  ) => {
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

      const PROD = "https://backend-contract-service.onrender.com";
      // const LOCAL = "http://localhost:3000";

      const response = await axios.post(
        `${PROD}/api/contracts/store`,
        payload,
        { headers: { "Content-Type": "application/json" } },
      );

      console.log("Response:", response);

      if (response.status === 201) {
        console.log("Contract registered successfully!");
        console.log("Response Data:", response.data);
        setUID(response.data.id);
      } else {
        console.error(
          "Error: Failed to register the contract : ",
          response.statusText,
        );
      }
    } catch (error) {
      console.error(
        "Error: An error occurred while registering the contract : ",
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      // fetch ens from local storage
      const ens = localStorage.getItem("ens");

      if (ens) {
        const ensConfig = JSON.parse(ens);

        if (address) {
          setEns(ensConfig[address]);
        }
      }
    }
  }, [isConnected, address]);

  const ExplorerURL = `${chain?.blockExplorers?.default?.url}/tx/${ensHash}`;

  return (
    <DefaultLayout stage={stage}>
      {/* <Button onClick={handleCall}>CLICK</Button> */}
      {stage === "world-id" && (
        <WorldID
          isWorldIDVerified={isWorldIDVerified}
          setIsWorldIDVerified={setIsWorldIDVerified}
          setStage={setStage}
        />
      )}

      {stage === "connect-wallet" && (
        <div className="flex h-full justify-center items-center">
          {/* Card Container with Perspective */}
          <div className="relative w-96 h-[65vh] perspective-3d">
            {/* Card Inner Wrapper */}
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                isRegisteringSmartContract ? "rotate-y-180" : ""
              }`}
            >
              {/* Front Side */}
              <div className="absolute w-full h-full backface-hidden flex justify-center items-center bg-white shadow-lg rounded-lg flex-col">
                {stage === "connect-wallet" && <ConnectWallet />}
                {!ens ? (
                  <ENSForm setEns={setEns} setEnsHash={setEnsHash} />
                ) : (
                  <div className="flex">
                    {" "}
                    Hello {ens} 👋
                    {ensHash && <Link className="pl-2" to={ExplorerURL}>
                      <svg
                        fill="gray"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                      </svg>
                    </Link>}
                  </div>
                )}
                <Switch
                  aria-label="Register Smart Contract"
                  className="py-8"
                  isSelected={isRegisteringSmartContract}
                  onValueChange={handleToggle}
                >
                  <span className="text-sm">
                    Are You Registering Smart Contract.
                  </span>
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
                  <span className="text-sm">
                    {UID ? "GO Back!!" : "Are You Registering Smart Contract."}
                  </span>
                </Switch>
                {isConnected ? (
                  <Form
                    UID={UID}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
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
