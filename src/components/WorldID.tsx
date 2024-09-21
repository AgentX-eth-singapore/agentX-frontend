"use client"; // for Next.js app router
import React, { useEffect } from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { Button } from "@nextui-org/button";
import worldid from "../assets/worldId.png";

interface WorldIDProps {
  setStage: (stage: string) => void;
  isWorldIDVerified: boolean;
  setIsWorldIDVerified: (isVerified: boolean) => void;
}

export default function WorldID({
  setStage,
  isWorldIDVerified,
  setIsWorldIDVerified,
}: WorldIDProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (isWorldIDVerified) {
      setStage("connect-wallet");
    }
  }, [isWorldIDVerified]);

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
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Verify your identity with World ID
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
        We want you to verify your identity with World ID to access the
        platform. this will help us keeping bots and scammers away.
      </span>
      <div>
        <img
          src={worldid}
          alt="World ID"
          style={{
            width: "100%",
            maxWidth: "150px",
            display: "block",
            margin: "auto",
            marginTop: "4rem",
            marginBottom: "4rem",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <IDKitWidget
          app_id="app_staging_7b5df11de7483d6ee1d8f6cbaf0469eb" // obtained from the Developer Portal
          action="verify-user" // obtained from the Developer Portal
          onSuccess={() => {
            setIsWorldIDVerified(true);
            setStage("connect-wallet");
            localStorage.setItem("isWorldIDVerified", "true");
          }} // callback when the modal is closed
          handleVerify={() => {
            console.log("verifying");
            setIsLoading(false);
          }} // callback when the proof is received
          verification_level={VerificationLevel.Orb}
        >
          {({ open }) => (
            // This is the button that will open the IDKit modal
            <Button
              isLoading={isLoading}
              onClick={() => {
                setIsLoading(true);
                open();
              }}
            >
              Verify with World ID
            </Button>
          )}
        </IDKitWidget>
      </div>
    </div>
  );
}
