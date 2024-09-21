import { Parallax } from "react-scroll-parallax";
import React from "react";

// Define StepProps with the appropriate types
type StepProps = {
  title: string;
  status: string;
  features: string[];
  imageUrl: string;
  forwardImage?: string;
  forwardPosition?: "top" | "bottom"; // Optional "top" or "bottom" position
};

const Step: React.FC<StepProps> = ({
  title,
  status,
  features,
  imageUrl,
  forwardImage,
  forwardPosition,
}) => (
  <div className="flex flex-col items-center">
    {/* Conditionally render forwardImage if forwardPosition is "top" */}
    {forwardPosition === "top" && forwardImage && (
      <img src={forwardImage} alt="fwd" className="mb-3" />
    )}
    <img className="w-36" src={imageUrl} alt="step" />
    <p className="text-purple-500 mt-3">{status}</p>
    <h3 className="text-3xl font-semibold my-4 mt-2">{title}</h3>
    <div className="flex flex-col gap-3">
      {features.map((feature, index) => (
        <p key={index}>✨ {feature}</p>
      ))}
    </div>
    {/* Conditionally render forwardImage if forwardPosition is "bottom" */}
    {forwardPosition === "bottom" && forwardImage && (
      <img src={forwardImage} alt="fwd" className="mt-5" />
    )}
  </div>
);

const RoadMap: React.FC = () => {
  const steps: StepProps[] = [
    {
      title: "React Interface",
      status: "Completed",
      features: [
        "Vite React Interface",
        "Cool Animations",
        "Framer Motion",
        "Figma Design.",
      ],
      imageUrl:
        "https://wordpress.iqonic.design/product/wp/ealain/wp-content/uploads/2022/07/Group-3.webp",
      forwardImage: "./images/fwd-2.png",
      forwardPosition: "top",
    },
    {
      title: "Web3 Interface",
      status: "Completed",
      features: [
        "Connect Wallet",
        "Thirdweb SDK",
        "NFT Gating",
        "Wallet SDK.",
      ],
      imageUrl:
        "https://wordpress.iqonic.design/product/wp/ealain/wp-content/uploads/2022/07/Group-6.webp",
      forwardImage: "./images/fwd-1.png",
      forwardPosition: "bottom",
    },
    {
      title: "Accomplishment",
      status: "Completed",
      features: [
        "NFT Gated Website",
        "Wallet Integration",
        "Cool Animations",
        "Build on Time.",
      ],
      imageUrl:
        "https://wordpress.iqonic.design/product/wp/ealain/wp-content/uploads/2022/07/Group-5.webp",
      forwardImage: "./images/fwd-2.png",
      forwardPosition: "top",
    },
  ];

  return (
    <div className="py-16">
      <img
        style={{ filter: "invert(0.2)" }}
        src="./images/wave.webp"
        alt="wave"
        className="lg:h-26 md:h-20 h-16"
      />
      <Parallax speed={-10}>
        <div className="flex items-center justify-center text-center gap-3 flex-col mb-16">
          <img src="./images/wave-pattern.webp" className="h-7" alt="wave" />
          <p className="text-4xl font-medium">
            June <span className="text-purple-500">Submission</span>
          </p>
        </div>
      </Parallax>

      <div className="flex flex-wrap px-10 justify-evenly gap-10 gap-y-20 items-center py-18">
        {steps.map((step, index) => (
          <Step
            key={index}
            title={step.title}
            status={step.status}
            features={step.features}
            imageUrl={step.imageUrl}
            forwardImage={step.forwardImage}
            forwardPosition={step.forwardPosition}
          />
        ))}
      </div>
    </div>
  );
};

export default RoadMap;
