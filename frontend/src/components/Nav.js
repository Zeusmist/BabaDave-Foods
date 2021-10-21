/* eslint-disable eqeqeq */
import { Row, Col } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../assets/logo1.jpg";
import "../styles/Nav.scss";
import { BookOpen, LogIn, ShoppingBag } from "react-feather";

export const Nav = (props) => {
  const location = useLocation();
  const history = useHistory();

  const isMenu = location.pathname == "/menu" || location.pathname == "/";

  let buttons = [
    {
      id: "cart",
      title: "VIEW CART",
      icon: ShoppingBag,
      onclick: () => history.push("/cart"),
    },
    {
      id: "menu",
      title: "VIEW MENU",
      icon: BookOpen,
      onclick: () => history.push("/menu"),
    },
    {
      id: "login",
      title: "LOG IN",
      icon: LogIn,
      onclick: () => history.push("/login"),
    },
    {
      id: "signup",
      title: "SIGN UP",
      icon: LogIn,
      onclick: () => history.push("/signup"),
    },
  ];

  return (
    <Row
      md="auto"
      className="justify-content-center align-items-center navbar-container"
    >
      <div className="d-flex justify-content-center">
        <div href="/">
          <img src={logo} className="navbar-image" alt="BabaDaveFoods Logo" />
        </div>
      </div>
      <Col md="auto">
        <div style={{ textAlign: "center" }}>
          <div className="fw-bold fst-italic fs-1">BabaDave Foods</div>
          Heaven on Earth feel🍝🍝
          <br />
          Meals that Tickle your Eyes,Tickle Your Nose and Tickle Your Tummy 😜
        </div>
        <div className="d-flex pt-3 justify-content-center ">
          {buttons
            .filter((button) =>
              isMenu ? button.id != "menu" : button.id != "cart"
            )
            .map((button, i) => (
              <div
                key={i}
                onClick={button.onclick}
                className="d-flex align-items-end me-2 px-2 py-1 rounded-pill gradient-background btn"
              >
                {/* <button.icon size={12} strokeWidth={2} /> */}
                <div className="ms-1 lh-1">{button.title}</div>
              </div>
            ))}
        </div>
      </Col>
    </Row>
  );
};
