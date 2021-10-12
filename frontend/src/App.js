import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.scss";
import Container from "react-bootstrap/Container";
import { Nav } from "./components/Nav";
import Content from "./components/Content";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Container className="main-container" fluid>
        <Nav />
        <Content />
      </Container>
    </Provider>
  );
}

export default App;
