/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../utils/auth";
import Header from "./Header";
import Orders from "./Orders";
import { useState } from "react";
import Addresses from "./Addresses";
import "./styles.scss";

const Account = (props) => {
  const history = useHistory();

  const [activeView, setActiveView] = useState("orders");

  const handleLogout = async () => {
    await logoutUser().then(() => {
      history.push("/menu");
    });
  };

  return (
    <div>
      <div className="account-page">
        <Header
          handleLogout={handleLogout}
          setActiveView={(view) => setActiveView(view)}
          activeView={activeView}
        />
        {activeView == "orders" && <Orders />}
        {activeView == "addresses" && <Addresses />}
      </div>
    </div>
  );
};

export default Account;
