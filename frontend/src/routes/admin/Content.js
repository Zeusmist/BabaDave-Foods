/* eslint-disable eqeqeq */
import "../../styles/Content.scss";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { content_pages } from "./utils/pages";

const Page = ({ children, title, id }) => {
  const { info } = useSelector((state) => state.admin);
  const history = useHistory();

  useEffect(() => {
    document.title = `BabaDave Foods - Admin - ${title}`;
  }, [title]);

  useEffect(() => {
    if (!info) history.push("/admin/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  return children;
};

const Content = (props) => {
  const location = useLocation();

  const activePage = content_pages.find((page) => page.id == location.pathname);

  return (
    <div className={`d-flex flex-column rounded-top content-container mt-3`}>
      <div className="fw-bold fs-4 text-center mb-4 mt-2">
        {activePage?.title}
      </div>
      <Switch>
        {content_pages.map((page, i) => (
          <Route key={i} path={`${page.id}`} exact={page.id == "/admin"}>
            <Page title={page.title} id={page.id}>
              <page.component {...(page.props ? page.props : {})} />
            </Page>
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default Content;
