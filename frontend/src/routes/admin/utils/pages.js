import Discounts from "../Discounts";
import Orders from "../Orders";
import Products from "../Products";

export const content_pages = [
  { id: "/admin", title: "ORDERS", component: Orders },
  { id: "/admin/orders", title: "ORDERS", component: Orders },
  { id: "/admin/products", title: "PRODUCTS", component: Products },
  { id: "/admin/discounts", title: "DISCOUNTS", component: Discounts },
];
