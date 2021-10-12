/* eslint-disable eqeqeq */
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../assets/logo1.jpg";
import "../styles/Nav.scss";

export const Nav = (props) => {
  const [isCart, setIsCart] = useState(false);

  let buttons = [
    { id: "cart", title: "View cart", onclick: () => setIsCart(true) },
    { id: "menu", title: "View menu", onclick: () => setIsCart(false) },
    {
      id: "checkout",
      title: "Checkout",
      onclick: () => null,
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
              !isCart ? button.id != "menu" : button.id != "cart"
            )
            .map((button, i) => (
              <div
                key={i}
                onClick={button.onclick}
                style={{ backgroundColor: "#FF571E" }}
                className="me-2 px-2 py-1 rounded-pill gradient-background btn"
              >
                {button.title}
              </div>
            ))}
        </div>
      </Col>
    </Row>
  );
};
