import { Input, Button } from "@nextui-org/react"; // Ensure Button is imported correctly from NextUI
import React, { useState } from "react";
import { abi as ENSResolverABI } from "../../abi/ENSController.json";
import { simulateContract, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { config } from "@/config/wallet";
import { useAccount } from "wagmi";


interface ENSFormProps {
  setEns: (ens: string) => void;
  setEnsHash: (ensHash: string) => void;
}

const ENSForm: React.FC<ENSFormProps> = ({ setEns, setEnsHash }) => {
  const { address } = useAccount(); // Get the address from the account
  const RESOVLER_ADDRESS = "0xf7D3d37ea056e1A6e73CF75A7F005C232c1b2A2d"; // Define the resolver address
  // Define state with appropriate types
  const [name, setName] = useState<string>("");
  const [resolverAddress, setResolverAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define handleSubmit function with types for parameters and return type
  const handleSubmit = async (name: string) => {
    setIsLoading(true);
    try {
      
      const tx = await simulateContract(config, {
        address: RESOVLER_ADDRESS,
        abi: ENSResolverABI,
        functionName: 'register',
        args: [name, address, resolverAddress]
      })

      const hash = await writeContract(config, tx.request);
      await waitForTransactionReceipt(config, { hash: hash });
      setIsLoading(false);
      setEns(name + ".agentx.eth");

      // Store the ENS name in localStorage
      const mapping = JSON.parse(localStorage.getItem("ens") || "{}");
      if (address) {
        mapping[address] = name + ".agentx.eth";
      }
      localStorage.setItem("ens", JSON.stringify(mapping));

      // Wait for the transaction receipt
      setEnsHash(hash);
      console.log(hash);
      // Additional logic can be implemented here, such as using the resolved address
    } catch (error) {
      console.error("Error resolving address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 flex-col">
      <h1 className="text-xl font-semibold gap-4 py-4">Claim your subdomain with us</h1>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">.agentx.eth</span>
          </div>
        }
      />
      <Input
        type="text"
        value={resolverAddress}
        onChange={(e) => setResolverAddress(e.target.value)}
        label="Resolver Address"
      />
      <Button
        color="primary"
        isLoading={isLoading}
        onClick={() => handleSubmit(name)}
      >
        Register
      </Button>
    </div>
  );
};

export default ENSForm;
