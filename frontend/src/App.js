/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Container from "react-bootstrap/Container";
import { Nav } from "./components/Nav";
import Content from "./components/Content";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./config";
import { addAddress, removeInfo, updateInfo } from "./redux/slices/user";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(updateInfo({ info: {} }));
        console.log({ user });
        setUserData(user.uid);
      } else {
        // remove user details from app
        console.log({ user });
        dispatch(removeInfo());
      }
    });
  }, []);

  const setUserData = async (uid) => {
    // fetch user data and update in app
    console.log("SETTING USER DATA");

    // fetch user info
    const info_docSnap = await getDoc(doc(db, "users", uid));
    if (info_docSnap.exists) {
      let userInfo = info_docSnap.data();
      delete userInfo.password;
      dispatch(updateInfo({ info: userInfo }));
    }

    // fetch user addresses
    const addresses_querySnapshot = await getDocs(
      collection(db, `users/${uid}/addresses`)
    );
    addresses_querySnapshot.forEach((d) => {
      dispatch(addAddress({ address: { id: d.id, ...d.data() } }));
    });
  };

  return (
    <Container className="main-container" fluid>
      <Router>
        <Nav />
        <Content />
      </Router>
    </Container>
  );
}

export default App;
