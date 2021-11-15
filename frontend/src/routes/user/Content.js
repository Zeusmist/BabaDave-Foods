/* eslint-disable eqeqeq */
import "../../styles/Content.scss";
import Menu from "../../components/Menu/Menu";
import Cart from "../../components/Cart/Cart";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Checkout from "../../components/Checkout/Checkout";
import Authenticate from "../../components/Authenticate";
import { useEffect } from "react";
import Account from "../../components/Account/Account";
import { useSelector } from "react-redux";

const Page = ({ children, title, id, auth }) => {
  const { info } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    document.title = `BabaDave Foods - ${title}`;
  }, [title]);

  useEffect(() => {
    if (auth && !info) history.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, info]);

  return children;
};

const Content = (props) => {
  const content_pages = [
    { id: "/", title: "MENU", component: Menu },
    { id: "/menu", title: "MENU", component: Menu },
    { id: "/cart", title: "REVIEW CART", component: Cart },
    { id: "/checkout", title: "CHECKOUT", component: Checkout, auth: true },
    {
      id: "/my-account",
      title: "MY ACCOUNT",
      component: Account,
      auth: true,
      hideTitle: true,
    },
    { id: "/login", title: "LOGIN", component: Authenticate },
    {
      id: "/signup",
      title: "SIGN UP",
      component: Authenticate,
      props: { signup: true },
    },
  ];

  const location = useLocation();

  const activePage = content_pages.find((page) => page.id == location.pathname);

  return (
    <div className="d-flex flex-column rounded-top content-container mt-3">
      {!activePage?.hideTitle && (
        <div className="fw-bold fs-4 text-center mb-4 mt-2">
          {activePage?.title}
        </div>
      )}
      <Switch>
        {content_pages.map((page, i) => (
          <Route key={i} path={`${page.id}`} exact={page.id == "/"}>
            <Page title={page.title} auth={page?.auth} id={page.id}>
              <page.component {...(page.props ? page.props : {})} />
            </Page>
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default Content;
