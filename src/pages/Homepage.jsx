import React from "react";
import purpleImage from "/src/assets/home-purple.svg";
import greenImage from "/src/assets/home-green.svg";

import cryptoProfile from "/src/assets/undraw_crypto_portfolio_2jy5.svg";
function HomePage() {
  return (
    <div
      className="bg-black text-white"
      style={{
        backgroundImage: `url(${purpleImage}), url(${greenImage})`,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "0 0, right top",
        backgroundSize: "w-271 h-688, w-271 h-688",
      }}
    >
      <div>
        <h2 className="text-center text-5xl font-extrabold font-sans m-6 pt-64">
          XRP Legacy Locker
        </h2>
        <p className="text-center text-2xl font-bold font-sans">
          {" "}
          Securely Transfer Your XRP to Your Loved Ones{" "}
        </p>

        <div className=" text-2xl  font-sans mt-60 px-60">
          <p className="text-center font-bold text-3xl">
            Introducing XRP LegacyLocker: Redefining the Way You Pass On Wealth
          </p>
          <br />
          <h3 className="text-2xl mt-8 font-bold">
            Unlock the Power of XRP LegacyLocker
          </h3>
          <div className="text-xl mt-6">
            Are you ready to redefine the way you pass on your wealth to the
            next generation? XRP LegacyLocker is here to unlock the full
            potential of digital inheritance, ensuring that your financial
            legacy is passed on seamlessly and securely to your loved ones.
            Welcome to a world of transparency, control, and peace of mind.
          </div>
        </div>

        <div className="flex">

        
          <img
            src={cryptoProfile}
            alt="Description of Image"
            className="w-96 h-96 mt-14 ml-28"
          />
          <div className=" text-xl  font-sans mt-32 px-36">
            <h3 className=" text-3xl font-bold mb-4">
              Why Choose XRP LegacyLocker?
            </h3>
            <p className="font-bold mt-8 mb-3"> Empowerment and Simplicity:</p>
            <div>
              At XRP LegacyLocker, we understand that your time and independence
              are invaluable. Our mission is to empower you to safeguard your
              financial legacy effortlessly. With our platform, you gain
              complete control over your digital assets and the confidence that
              your wealth will reach your children and beneficiaries exactly as
              you intend.
            </div>
          </div>
        </div>

        <div className="flex my-28">
          <div className=" text-xl font-sans mt-20 px-36">
            <h3 className="text-3xl font-bold">Trust in the Blockchain</h3>
            <div className="mt-6">
              Blockchain technology is the cornerstone of XRP LegacyLocker.{" "}
              <br />
              The decentralized nature of blockchain ensures the highest level
              of trust and security. Your assets are safeguarded by the
              blockchain, making XRP LegacyLocker the most reliable choice for
              your legacy planning.
            </div>
          </div>
          <img
            src="/src/assets/undraw_nakamoto_-2-iv6.svg"
            alt="Description of Image"
            className="w-96 h-96 mr-36"
          />
        </div>
        <div className="px-36 mt-20">


  <h4 className="text-3xl font-sans mb-10 font-bold">
    Benefits of LegacyLocker
  </h4>

  <ul className="flex flex-wrap justify-between gap-6">
    <li className="flex-1">
      <p className="mb-3 font-bold text-xl">Public and Decentralized:</p>
      <ul className="text-lg text-gray-300">
        <li>Your legacy, accessible to you and your heirs, secured on the blockchain, with no intermediaries.</li>
      </ul>
    </li>

    <li className="flex-1">
      <p className="mb-3 font-bold text-xl">Transparent:</p>
      <ul className="text-lg text-gray-300">
        <li>Clear, open, and honest - our platform ensures you're always in the know about your digital assets.</li>
      </ul>
    </li>

    <li className="flex-1">
      <p className="mb-3 font-bold text-xl">No Hidden Charges:</p>
      <ul className="text-lg text-gray-300">
        <li>We believe in upfront honesty; you won't find any hidden fees here.</li>
      </ul>
    </li>
  </ul>

  <ul className="flex flex-wrap justify-between gap-6 mt-10">
    <li className="flex-1">
      <p className="mb-3 font-bold text-xl">Fully Automated:</p>
      <ul className="text-lg text-gray-300">
        <li>Streamline your legacy planning effortlessly with our automated processes, saving you time and effort.</li>
      </ul>
    </li>

    <li className="flex-1">
      <p className="mb-3 font-bold text-xl">Secure:</p>
      <ul className="text-lg text-gray-300">
        <li>Your digital assets are locked down with the highest level of security, so you can rest easy knowing they're safe.</li>
      </ul>
    </li>

    <li className="flex-1">
      <p className="mb-3 font-bold text-xl">Blockchain-Powered:</p>
      <ul className="text-lg text-gray-300">
        <li>Embrace the future of wealth transfer with the robust security and reliability of blockchain technology.</li>
      </ul>
    </li>
  </ul>
</div>


        <div className="flex mt-36">
          <img
            src="/src/assets/undraw_online_transactions_-02-ka.svg"
            alt="Description of Image"
            className="w-96 h-96 ml-36"
          />
          <div className=" text-xl  font-sans mt-20 px-36">
            <h3 className=" text-3xl font-bold">
              Ready to Secure Your Legacy?
            </h3>
            <div className="mt-4 my-64">
              Take the first step towards securing your digital assets for your
              heirs. Connect today and create your XRP LegacyLocker. <br />{" "}
              Trust in the blockchain, and make the future of wealth transfer
              simple, secure, and hassle-free.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
//       <p> Your Path to Hassle-Free Digital Inheritance</p>
