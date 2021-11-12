/* eslint-disable eqeqeq */
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logo1.jpg";
import "../../styles/Nav.scss";
import { BookOpen, LogIn, ShoppingBag, User } from "react-feather";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Nav = (props) => {
  const history = useHistory();
  const { info } = useSelector((state) => state.user);

  const [btns, setBtns] = useState([]);

  const initialButtons = [
    {
      id: "menu",
      title: "VIEW MENU",
      icon: BookOpen,
      onclick: () => history.push("/menu"),
    },
    {
      id: "cart",
      title: "VIEW CART",
      icon: ShoppingBag,
      onclick: () => history.push("/cart"),
    },
  ];

  useEffect(() => {
    if (info) {
      setBtns([
        ...initialButtons,
        {
          id: "account",
          title: "MY ACCOUNT",
          icon: User,
          onclick: () => history.push("/my-account"),
        },
      ]);
    } else {
      setBtns([
        ...initialButtons,
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
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  return (
    <Row
      md="auto"
      className="navbar-container justify-content-center align-items-center"
    >
      <div className="d-flex justify-content-center">
        <div href="/">
          <img src={logo} className="navbar-image" alt="BabaDaveFoods Logo" />
        </div>
      </div>
      <Col md="auto">
        <div className="nav-description">
          <div className="fw-bold fst-italic fs-1">BabaDave Foods</div>
          Heaven on Earth feel🍝🍝
          <br />
          Meals that Tickle your Eyes,Tickle Your Nose and Tickle Your Tummy 😜
        </div>
        <div className="nav-buttons d-flex pt-2 flex-wrap ">
          {btns.map((button, i) => (
            <div
              key={i}
              onClick={button.onclick}
              className="d-flex align-items-end me-2 mt-1 px-2 py-1 rounded-pill gradient-background btn"
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

export default Nav;
