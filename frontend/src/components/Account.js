/* eslint-disable react-hooks/exhaustive-deps */
import { signOut } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../config";
import { removeInfo } from "../redux/slices/user";

const Account = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        dispatch(removeInfo());
        history.push("/menu");
      })
      .catch((err) => {
        console.log(err.code + ": " + err.message);
        alert(`${err.code}`.replace("auth/", "").replaceAll("-", " "));
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
