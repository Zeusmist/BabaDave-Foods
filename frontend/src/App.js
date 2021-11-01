/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from "@firebase/auth";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import Content from "./components/Content";
import { Nav } from "./components/Nav";
import { auth, db } from "./config";
import {
  populateCart,
  setCartQuantity,
  setCartTotal,
} from "./redux/slices/cart";
import { addAddress, removeInfo, updateInfo } from "./redux/slices/user";
import { getLocalStorage, updateLocalStorage } from "./utils/localstorage";

class App extends React.Component {
  componentDidMount() {
    this.observeAuth();
    this.reloadCart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartItems != this.props.cartItems) {
      this.updateCartCount();
      updateLocalStorage("cart", this.props.cartItems);
    }
  }

  observeAuth = () => {
    const { updateInfo, removeInfo } = this.props;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateInfo({ info: {} });
        this.setUserData(user.uid);
      } else {
        // remove user details from app
        removeInfo();
      }
    });
  };

  setUserData = async (uid) => {
    const { updateInfo, addAddress } = this.props;
    // fetch user data and update in app

    // fetch user info
    const info_docSnap = await getDoc(doc(db, "users", uid));
    if (info_docSnap.exists) {
      let userInfo = info_docSnap.data();
      delete userInfo.password;
      updateInfo({ info: userInfo });
    }

    // fetch user addresses
    const addresses_querySnapshot = await getDocs(
      collection(db, `users/${uid}/addresses`)
    );
    addresses_querySnapshot.forEach((d) => {
      addAddress({ address: { id: d.id, ...d.data() } });
    });
  };

  reloadCart = () => {
    const savedCart = getLocalStorage("cart");
    if (savedCart) this.props.populateCart({ items: savedCart });
  };

  updateCartCount = () => {
    let quantity = 0;
    let total = 0.0;
    this.props.cartItems.forEach((item) => {
      quantity += item.quantity;
      total += item.quantity * item.price;
    });
    this.props.setCartQuantity(quantity);
    this.props.setCartTotal(total);
  };

  render() {
    return (
      <Container className="main-container" fluid>
        <Router>
          <Nav />
          <Content />
        </Router>
      </Container>
    );
  }
}

const mapState = (state) => {
  const { cartItems } = state.cart;
  return { cartItems };
};

const mapDispatch = {
  updateInfo,
  removeInfo,
  populateCart,
  addAddress,
  setCartQuantity,
  setCartTotal,
};

export default connect(mapState, mapDispatch)(App);
