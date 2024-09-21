import { Link } from "react-router-dom";
import { Logo } from "../icons";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white text-sm w-full mt-40">
      <div className="w-[90%] m-auto py-5 flex flex-col md:flex-row lg:flex-row justify-between items-center text-gray-600 font-medium">
        <Link to="/" className="flex items-center gap-1">
          <Logo />
          <p className="font-bold">AGENT X</p>
        </Link>
      </div>

      <div className="w-[90%] m-auto bg-gray-800 h-px" />

      <div className="w-[90%] m-auto py-5 flex flex-col md:flex-row lg:flex-row justify-between items-center text-gray-600 font-medium">
        <p>© ETH SG {year} - Agent-X. All Rights Reserved.</p>
        <p>
          Made with ❤️ by{" "}
          <Link
            to="https://www.linkedin.com/in/codersadhu/"
            className="text-purple-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Codersadhu
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
