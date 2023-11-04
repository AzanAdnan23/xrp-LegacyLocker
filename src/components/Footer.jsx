import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 relative bottom-0 w-full z-10 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-600">
          <p>&copy; 2023 XRP Ledger. Open Source.</p>
        </div>
        <div className="space-x-4">
          <a
            href="https://github.com/AzanAdnan23"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-500 hover:text-purple-500"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/azanadnan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-500 hover:text-purple-500"
          >
            LinkedIn
          </a>
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
    </footer>
  );
};

export default Footer;
