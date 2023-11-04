import React from "react";
import Withdraw from "../components/Withdraw";
import green from  "/src/assets/home-green.svg";

function Recipient() {
  return (
    <div className="px-24"
    style={{
      backgroundImage: `url(${green})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top right",
      backgroundSize: "w-1000 h-1000",
    }}>
      <Withdraw />
      <div className="py-56"></div>
    </div>
  );
}

export default Recipient;
