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
import { removeInfo, updateInfo } from "./redux/slices/user";
import { doc, getDoc } from "@firebase/firestore";

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
    const docSnap = await getDoc(doc(db, "users", uid));
    let userData = docSnap.data();
    delete userData.password;
    if (docSnap.exists) dispatch(updateInfo({ info: userData }));
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
