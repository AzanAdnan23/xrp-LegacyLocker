import React, { useState } from "react";
import "../styles/UserDashboard.css";
import WalletCard from "../components/WalletCard";
import AddUsers from "../components/AddUsers";
import RevertPayment from "../components/RevertToOwner";
import PingContract from "../components/Ping";
import Userinfo from "../components/UserInfo";

function UserDashboard() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnect = () => {
    setIsWalletConnected(true);
  };

  return (
    <>
      <WalletCard onConnect={handleConnect} />
      {isWalletConnected && <Userinfo />}
      <AddUsers />
      <RevertPayment />
      <PingContract />
    </>
  );
}

export default UserDashboard;
