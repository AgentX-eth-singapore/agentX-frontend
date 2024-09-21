import { useEffect, useState } from "react";
import {
  Input,
  Select,
  SelectItem,
  Switch,
  Button,
  Textarea,
} from "@nextui-org/react";

import { IChain, chains } from "@/config/chains";
import WithCopyText from "../common/WithCopyText";

export default function Form({
  handleSubmit,
  UID,
  isLoading,
}: {
  handleSubmit: (
    chain: IChain,
    contractAddress: string,
    isCCIPEnabled: boolean,
    functionName: string,
    isMetaTransactionEnabled: boolean,
    textABI: string
  ) => void;
  isLoading: boolean;
  UID: string;
}) {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [chain, setChain] = useState<IChain | null>(null);
  const [isCCIPEnabled, setIsCCIPEnabled] = useState<boolean>(false);
  const [functionName, setFunctionName] = useState<string>("");
  const [isMetaTransactionEnabled, setIsMetaTransactionEnabled] =
    useState<boolean>(false);
  const [textABI, setTextABI] = useState("");

  useEffect(() => {
    setChain(null);
    setContractAddress("");
    setIsCCIPEnabled(false);
    setFunctionName("");
    setIsMetaTransactionEnabled(false);
    setTextABI("");
  }, [UID]);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 flex-col">
      <h1 className="text-xl font-semibold gap-4">
        {UID ? "SUCCESS !!" : "Register Your Contract"}
      </h1>

      {/* Select box with chains and icons */}
      {!UID && (
        <>
          {" "}
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
            label="Contract Address"
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
          {/* Switch for CCIP enabled with an additional input if selected */}
          <Switch
            aria-label="CCIP Enabled Toggle"
            checked={isCCIPEnabled}
            isSelected={isCCIPEnabled}
            onValueChange={() => setIsCCIPEnabled(!isCCIPEnabled)}
          >
            <span className="text-sm">Is your contract CCIP enabled</span>
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
            isSelected={isMetaTransactionEnabled}
            onValueChange={() =>
              setIsMetaTransactionEnabled(!isMetaTransactionEnabled)
            }
            aria-label="Do you support Oracle?"
          >
            <span className="text-sm">Do you support Oracle?</span>
          </Switch>
          <Textarea
            label="ABI"
            placeholder="Enter your ABI"
            value={textABI}
            onValueChange={setTextABI}
          />
          {/* Submit button with loading state */}
          <Button
            color="primary"
            isLoading={isLoading}
            onClick={() =>
              handleSubmit(
                chain as IChain,
                contractAddress,
                isCCIPEnabled,
                functionName,
                isMetaTransactionEnabled,
                textABI
              )
            }
          >
            Register
          </Button>
        </>
      )}

      {UID && (
        <div className="bg-gray-300 px-2 py-1 rounded-lg border shadow">
        <WithCopyText copieableText={UID}>
          <h1 className="text-gray-600">{UID}</h1>
        </WithCopyText>
        </div>
      )}
    </div>
  );
}
