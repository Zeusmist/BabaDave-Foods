import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Container from "react-bootstrap/Container";
import { Nav } from "./components/Nav";
import Content from "./components/Content";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
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
