import React from "react";
import Withdraw from "../components/Withdraw";
import green from  "/src/assets/home-green.svg";

function Recipient() {
  return (
    <div className="px-24"
    style={{
      backgroundImage: `url(${green})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      backgroundSize: "w-297 h-843",
    }}>
      <Withdraw />
    </div>
  );
}

export default Recipient;
