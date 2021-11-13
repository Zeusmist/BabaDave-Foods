/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../utils/auth";
import Header from "./Header";

const Account = (props) => {
  const history = useHistory();

  const handleLogout = async () => {
    await logoutUser().then(() => {
      history.push("/menu");
    });
  };

  return (
    <div>
      <div>
        <Header handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Account;
