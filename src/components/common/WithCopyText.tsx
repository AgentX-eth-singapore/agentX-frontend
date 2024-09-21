import React from "react";
import Copy from "@/assets/Copy";

interface WithCopyTextProps {
  children: React.ReactNode;
  copieableText: string;
}

const WithCopyText: React.FC<WithCopyTextProps> = ({
  children,
  copieableText,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(copieableText).then(
      () => {},
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  return (
    <div className="flex items-center">
      {children}
      <button
        onClick={handleCopy}
        className="ml-2 p-0 bg-none border-none cursor-pointer focus:outline-none inline-flex items-center justify-center"
      >
        <div className="inline-flex items-center justify-center transition-transform transform active:scale-90">
          <Copy />
        </div>
      </button>
    </div>
  );
};

export default WithCopyText;
