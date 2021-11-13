/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../utils/auth";
import Header from "./Header";
import { useSelector } from "react-redux";
import Orders from "./Orders";

const Account = (props) => {
  const { id } = useSelector((state) => state.user);
  const history = useHistory();

  const handleLogout = async () => {
    await logoutUser().then(() => {
      history.push("/menu");
    });
  };

  return (
    <div>
      <div>
        <Header handleLogout={handleLogout} userID={id} />
        <Orders />
      </div>
    </div>
  );
};

export default Account;
