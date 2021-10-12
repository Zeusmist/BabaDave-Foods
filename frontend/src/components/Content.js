import { useState } from "react";
import "../styles/Content.scss";
import Menu from "./Menu";

const Content = (props) => {
  const content_pages = [
    // menu, cart, checkout
    { id: "menu", title: "MENU", component: Menu },
    { id: "cart", title: "Cart", component: Menu },
    { id: "checkout", title: "", component: Menu },
  ];

  const [activePage, setActivePage] = useState(content_pages[0]);

  return (
    <div className="rounded-top content-container mt-3">
      <div className="fw-bold fs-4 text-center mb-4 mt-2">
        {activePage.title}
      </div>
      <activePage.component />
    </div>
  );
};

export default Content;
