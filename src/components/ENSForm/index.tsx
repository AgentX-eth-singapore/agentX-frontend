import { Input, Button } from "@nextui-org/react"; // Ensure Button is imported correctly from NextUI
import { resolveAddress } from "ethers";
import React, { useState } from "react";

const ENSForm: React.FC = () => {
  // Define state with appropriate types
  const [name, setName] = useState<string>("");
  const [resolverAddress, setResolverAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define handleSubmit function with types for parameters and return type
  const handleSubmit = async (name: string) => {
    setIsLoading(true);
    try {
      // Call resolveAddress from ethers to get the address associated with the ENS name
      const resolvedAddress = await resolveAddress(name);
      console.log(`Resolved Address: ${resolvedAddress}`);
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
