import { signOut } from "@firebase/auth";
import { auth } from "../config";
import { removeInfo_admin } from "../redux/slices/admin";
import { removeInfo } from "../redux/slices/user";
import store from "../redux/store";

export const logoutUser = async () => {
  await signOut(auth)
    .then(() => {
      store.dispatch(removeInfo());
      store.dispatch(removeInfo_admin());
    })
    .catch((err) => {
      console.log(err.code + ": " + err.message);
      alert(`${err.code}`.replace("auth/", "").replaceAll("-", " "));
    });
};
