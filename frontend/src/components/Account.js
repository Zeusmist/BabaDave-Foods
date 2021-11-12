/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import { logoutUser } from "../utils/auth";

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
        <div onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
};

export default Account;
