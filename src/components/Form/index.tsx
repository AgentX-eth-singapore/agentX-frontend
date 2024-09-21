import { useState } from "react";
import {
  Input,
  Select,
  SelectItem,
  Switch,
  Button,
  Textarea,
} from "@nextui-org/react";
import { IChain, chains } from "@/config/chains";
import axios from "axios";
// import { stringify } from "viem";
import Ajv from "ajv";

export default function Form() {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [chain, setChain] = useState<IChain | null>(null);
  const [isCCIPEnabled, setIsCCIPEnabled] = useState<boolean>(false);
  const [functionName, setFunctionName] = useState<string>("");
  const [isMetaTransactionEnabled, setIsMetaTransactionEnabled] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [textABI, setTextABI] = useState("");

  const abiSchema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        inputs: { type: "array" },
        stateMutability: { type: "string" },
        type: { type: "string" },
        name: { type: "string" },
        outputs: { type: "array", nullable: true },
        anonymous: { type: "boolean", nullable: true },
      },
      required: ["type"], // At least 'type' is required in each object
    },
  };

  // Initialize ajv instance
  const ajv = new Ajv();

  const handleSubmit = async () => {
    console.log("Submitting form...", chain, contractAddress);
    if (!chain?.chainId || !contractAddress) {
      alert("Please select a chain and enter a contract address.");
      return;
    }

    let abi;
    try {
      console.log(textABI.trim(), "textABI.trim()");
      abi = JSON.parse(textABI.trim());
    } catch (parseError) {
      console.log("Invalid JSON format. Please check your input.");
      return;
    }

    // Validate the parsed JSON using the ajv schema
    const validate = ajv.compile(abiSchema);
    const valid = validate(abi);

    if (!valid) {
      console.log("ABI does not match the expected structure.");
      console.error(validate.errors);
      return;
    }

    const payload = {
      chainId: chain.chainIdHex,
      contractAddress,
      contractFunctions: ["increment", "getCount"],
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
        "https://7866-129-126-214-63.ngrok-free.app/api/contracts/txn-data",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        console.log("Contract registered successfully!");
        console.log("Response Data:", response.data);
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
    <div className="flex flex-wrap md:flex-nowrap gap-4 flex-col w-full md:w-1/2 lg:w-1/3 shadow px-8 py-8 mx-auto">
      <h1 className="text-xl font-semibold gap-4">Register Your Contract</h1>

      {/* Select box with chains and icons */}
      <Select
        items={chains}
        label="Select your chain"
        placeholder="Select a chain"
        // selectedKeys={chain?.name}
        onSelectionChange={(val) => {
          console.log(val);

          let mySet = new Set(val);
          let value = Array.from(mySet)[0];
          console.log(value, "value 67890");
        }}
        onChange={(e) => {
          const selected = e.target.value;
          const selectedChain = chains.find(
            (ch) =>
              ch.name.toString().toLocaleLowerCase() ===
              selected.toString().toLowerCase()
          );
          console.log(selectedChain, "selectedChain 12345");
          setChain(selectedChain || null);
        }}
        classNames={{ trigger: "h-12" }}
        renderValue={(items) => {
          return items.map((item) => {
            const selected = item?.key;

            const data = chains.find((ch) => ch.name === selected);
            return (
              <div key={item.key} className="flex items-center gap-2">
                {typeof data?.logo === "string" ? (
                  <img
                    alt={data.name}
                    className="flex-shrink-0 h-5 w-5"
                    src={data.logo}
                  />
                ) : (
                  data?.logo
                )}

                <div className="flex flex-col">
                  <span>{data?.name || "Unknown"}</span>
                </div>
              </div>
            );
          });
        }}
      >
        {chains.map((chain) => (
          <SelectItem key={chain.name} value={chain.name}>
            <div className="flex items-center gap-2">
              {typeof chain.logo === "string" ? (
                <img
                  alt={chain.name}
                  className="flex-shrink-0 h-5 w-5"
                  src={chain.logo}
                />
              ) : (
                chain.logo
              )}

              <span>{chain.name}</span>
            </div>
          </SelectItem>
        ))}
      </Select>

      {/* Input for contract address */}
      <Input
        type="text"
        label="Contract Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />

      {/* Switch for CCIP enabled with an additional input if selected */}
      <Switch
        checked={isCCIPEnabled}
        onChange={() => setIsCCIPEnabled(!isCCIPEnabled)}
        aria-label="CCIP Enabled Toggle"
      >
        Is your contract CCIP enabled
      </Switch>

      {/* Show input for function name when CCIP is enabled */}
      {isCCIPEnabled && (
        <Input
          type="text"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
          label="Function Name"
        />
      )}

      {/* Switch for Meta Transaction Enabled */}
      <Switch
        checked={isMetaTransactionEnabled}
        onChange={() => setIsMetaTransactionEnabled(!isMetaTransactionEnabled)}
        aria-label="Meta Transaction Toggle"
      >
        Meta transaction enabled
      </Switch>

      <Textarea
        label="ABI"
        placeholder="Enter your ABI"
        value={textABI}
        onValueChange={setTextABI}
      />

      {/* Submit button with loading state */}
      <Button onClick={handleSubmit} color="primary" isLoading={isLoading}>
        Register
      </Button>
    </div>
  );
}
