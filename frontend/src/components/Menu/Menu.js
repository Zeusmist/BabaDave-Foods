/* eslint-disable eqeqeq */
import "../../styles/Menu.scss";
import allProductImages from "../../assets/images/products";
import MenuItemImages from "./MenuItemImages";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../redux/slices/cart";
import { PlusSquare } from "react-feather";
import { useHistory } from "react-router-dom";

const demo_products = [
  { id: "spag", title: "spag", images: allProductImages.spag, price: "150.40" },
  {
    id: "planbeef",
    title: "planbeef",
    images: allProductImages.planbeef,
    price: "120.20",
  },
  {
    id: "spag1",
    title: "spag",
    images: allProductImages.spag,
    price: "100.00",
  },
  {
    id: "planbeef1",
    title: "planbeef",
    images: allProductImages.planbeef,
    price: "500.60",
  },
  {
    id: "spag2",
    title: "spag",
    images: allProductImages.spag,
    price: "100.00",
  },
  {
    id: "planbeef3",
    title: "planbeef",
    images: allProductImages.planbeef,
    price: "200.00",
  },
];

const Menu = (props) => {
  let [containerWidth, setcontainerWidth] = useState(0);
  let [cartInfoHeight, setCartInfoHeight] = useState(0);

  const containerRef = useRef(null);
  const cartInfoContainerRef = useRef(null);

  const history = useHistory();

  const { cartItems, cartQuantity, cartTotal } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const updateCart = (action, product) => {
    const itemIndex = cartItems.findIndex((item) => item.id == product.id);
    if (action == "add") dispatch(addItem({ itemIndex, item: product }));
    if (action == "remove") dispatch(removeItem({ itemIndex }));
  };

  useEffect(() => {
    setcontainerWidth(containerRef?.current?.offsetWidth);
  }, [containerRef?.current?.offsetHeight]);

  useEffect(() => {
    setCartInfoHeight(cartInfoContainerRef?.current?.offsetHeight);
  }, [cartInfoContainerRef?.current?.offsetHeight]);

  return (
    <div ref={containerRef} className="menu">
      <div className="menu-items d-flex justify-content-around flex-wrap px-3">
        {demo_products.map((product, i) => (
          <div key={i} className="menu-item">
            <MenuItemImages product={product} />
            <div className="d-flex justify-content-between align-items-center mx-2">
              <div>
                <div>{product.title}</div>
                <div>₦{product.price}</div>
              </div>
              <div
                className="btn p-0"
                onClick={() => updateCart("add", product)}
              >
                <PlusSquare color="#FE9D2B" strokeWidth={2} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: cartInfoHeight }}></div>

      <div
        ref={cartInfoContainerRef}
        className="cart-info d-flex justify-content-between p-3"
        style={{
          visibility: cartQuantity > 0 ? "visible" : "hidden",
          width: containerWidth,
        }}
      >
        {/* mini order info */}
        <div>{cartQuantity} Items</div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/cart")}
        >
          VIEW CART
        </div>
        <div>
          ₦{cartTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
