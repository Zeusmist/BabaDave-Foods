/* eslint-disable eqeqeq */
import "../styles/Content.scss";
import Menu from "./Menu";
import Cart from "./Cart";
import { Switch, Route, useLocation } from "react-router-dom";
import Checkout from "./Checkout";
import Authenticate from "./Authenticate";

const Content = (props) => {
  const content_pages = [
    { id: "/", title: "MENU", component: Menu },
    { id: "/menu", title: "MENU", component: Menu },
    { id: "/cart", title: "REVIEW CART", component: Cart },
    { id: "/checkout", title: "CHECKOUT", component: Checkout },
    { id: "/login", title: "LOG IN", component: Authenticate },
    {
      id: "/signup",
      title: "SIGN UP",
      component: Authenticate,
      props: { signup: true },
    },
  ];

  const location = useLocation();

  const activePage = content_pages.find((page) => page.id == location.pathname);
  console.log({ location, activePage });

  return (
    <div className="d-flex flex-column rounded-top content-container mt-3">
      <div className="fw-bold fs-4 text-center mb-4 mt-2">
        {activePage.title}
      </div>
      <Switch>
        {content_pages.map((page, i) => (
          <Route key={i} path={`${page.id}`} exact={page.id == "/"}>
            <page.component {...(page.props ? page.props : {})} />
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default Content;
