/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import AdminRoute from "./routes/admin";
import UserRoute from "./routes/user";

class App extends React.Component {
  state = {};

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const isAdmin = window.location.pathname.startsWith("/admin");

    return (
      <Container className="main-container" fluid>
        {hasError ? (
          <div>Something went wrong</div>
        ) : (
          <Router>{!isAdmin ? <UserRoute /> : <AdminRoute />}</Router>
        )}
      </Container>
    );
  }
}

export default App;
