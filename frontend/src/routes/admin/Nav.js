/* eslint-disable eqeqeq */
/**
 * Options:
 * Orders, Products, Discounts, Users*
 */

import { useHistory, useLocation } from "react-router";
import { content_pages } from "./utils/pages";

const options = [
  { id: "/admin/orders", label: "Orders" },
  { id: "/admin/products", label: "Products" },
  { id: "/admin/discounts", label: "Discounts" },
];

const Nav = (props) => {
  const history = useHistory();
  const location = useLocation();

  const handleNavigate = (option) => {
    history.push(option.id);
  };

  const activePage = content_pages.find((page) => page.id == location.pathname);

  return (
    <div className="m-2 mt-4 d-flex flex-wrap justify-content-center">
      {options.map((option, i) => (
        <div
          key={i}
          onClick={() => handleNavigate(option)}
          className={`btn btn-outline-secondary text-uppercase mt-2 ${
            i > 0 && "ms-2"
          } ${activePage.id == option.id && "active"}`}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default Nav;
