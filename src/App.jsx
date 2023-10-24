import "./App.css";
import WalletCard from "./WalletCard";
import AddUsers from "./AddUsers";
import RevertPayment from "./RevertToOwner";
import PingContract from "./Ping";
import Userinfo from "./UserInfo";

function App() {
  return (
    <>
      <WalletCard />
      <AddUsers />
      <RevertPayment />
      <PingContract/>
      
    </>
  );
}
//<Userinfo/>
export default App;
