import React from "react";
import greenImage from "/src/assets/footer.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-30 relative">
      <div className="flex">
        <div className="container flex gap-20 items-center">
          <div className="ml-20">
            <p className="font-bold mb-4">About</p>
            <a
              href="https://xrpl.org/xrp-ledger-overview.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-500 hover:text-purple-500 "
            >
              XRPL Overview
            </a>
            <br />
            <a
              href="https://xrpl.org/xrp-overview.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-500 hover:text-purple-500"
            >
              XRP Overview
            </a>
            <br />
            <a
              href="https://xrpl.org/faq.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-500 hover:text-purple-500"
            >
              FAQ
            </a>
            <br />
            <a
              href="https://xrpl.org/privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-500 hover:text-purple-500"
            >
              Privacy Policy
            </a>
          </div>

          <div>
            <p className="font-bold mb-8">Resources</p>
            <a
              href="https://xrpl.org/dev-tools.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-500 hover:text-purple-500"
            >
              Dev Tools
            </a>
            <br />
            <a
              href="https://xrpl.org/docs.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-500 hover:text-purple-500"
            >
              Docs
            </a>
            <br />
            <a
              href="https://evm-sidechain.xrpl.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-500 hover:text-purple-500"
            >
              Ledger Explorer
            </a>
          </div>
        </div>

        <div className="space-x-4">
          <p className="font-bold mb-4">Official Profiles</p>
          <a
            href="https://github.com/AzanAdnan23"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-500 hover:text-purple-500"
          >
            GitHub
          </a>
          <br />
          <a
            href="https://www.linkedin.com/in/azanadnan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-500 hover:text-purple-500"
          >
            LinkedIn
          </a>
          <br />
          <a
            href="https://twitter.com/0xAzan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-500 hover:text-purple-500"
          >
            Twitter
          </a>
        </div>
      </div>
      <div className="text-center text-gray-400">
        <p className="">&copy; 2023 XRP Ledger. Open Source.</p>
      </div>
    </footer>
  );
};

export default Footer;
