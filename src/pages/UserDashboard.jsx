// UserDashboard.jsx
import React from "react";
import "../styles/UserDashboard.css";
import AddUsers from "../components/AddUsers";
import RevertPayment from "../components/RevertToOwner";
import PingContract from "../components/Ping";
import Userinfo from "../components/UserInfo";

function UserDashboard({ isWalletConnected }) {
  console.log("ud rendered");

  return (
    <>
      {isWalletConnected && <Userinfo />}
      <AddUsers />
      <RevertPayment />
      <PingContract />
    </>
  );
}

export default UserDashboard;
