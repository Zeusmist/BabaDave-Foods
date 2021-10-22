import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Container from "react-bootstrap/Container";
import { Nav } from "./components/Nav";
import Content from "./components/Content";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./config";

function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // update user in app
        console.log({ user });
        // ...
      } else {
        // update user in app
        console.log({ user });
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <Container className="main-container" fluid>
        <Router>
          <Nav />
          <Content />
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
