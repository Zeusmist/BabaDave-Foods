import { onAuthStateChanged } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { Component } from "react";
import { connect } from "react-redux";
import { auth, db } from "../../config";
import { updateInfo_admin, removeInfo_admin } from "../../redux/slices/admin";
import Content from "./Content";
import Nav from "./Nav";
import { withRouter } from "react-router-dom";

class AdminRoute extends Component {
  state = {};

  componentDidMount() {
    this.observeAuth();
  }

  observeAuth = () => {
    const { removeInfo_admin } = this.props;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log({ user });
        updateInfo_admin({ info: {} });
        this.verifyAdmin(user.uid);
      } else {
        // remove user details from app
        removeInfo_admin();
      }
    });
  };

  verifyAdmin = async (uid) => {
    const { updateInfo_admin } = this.props;
    const info_docSnap = await getDoc(doc(db, "admins", uid));
    if (info_docSnap.exists) {
      let adminInfo = info_docSnap.data();
      if (adminInfo) {
        updateInfo_admin({ info: adminInfo });
        console.log("verified", { adminInfo });
      } else this.props.history.push("/admin/login");
    } else this.props.history.push("/admin/login");
  };

  render() {
    console.log("rendered root");
    return (
      <>
        <Nav />
        <Content />
      </>
    );
  }
}

const mapDispatch = {
  updateInfo_admin,
  removeInfo_admin,
};

export default withRouter(connect(undefined, mapDispatch)(AdminRoute));
