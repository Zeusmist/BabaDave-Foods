/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useDispatch, useSelector } from "react-redux";
import { MinusSquare, PlusSquare, X } from "react-feather";
import { removeItem, updateItem } from "../redux/slices/cart";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

const CartItem = (props) => {
  const { item, i, cartItemsLength } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (item.quantity == 0) dispatch(removeItem({ itemIndex: i }));
  }, [item.quantity]);

  return (
    <>
      <div className="d-flex justify-content-between lh-1">
        <div className="d-flex flex-column justify-content-between ">
          <div>{item.title}</div>
          <div
            className="btn p-0 d-flex align-items-center lh-1 opacity-50 m-0"
            onClick={() => dispatch(removeItem({ itemIndex: i }))}
          >
            <X size={14} strokeWidth={4} /> <div className="lh-0">Remove</div>
          </div>
        </div>
        <div className="text-end">
          <div>
            ₦
            {(item.price * item.quantity).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <div
              className="btn p-0"
              onClick={() =>
                dispatch(
                  updateItem({
                    itemIndex: i,
                    key: "quantity",
                    value: item.quantity - 1,
                  })
                )
              }
            >
              <MinusSquare color="#FE9D2B" />
            </div>
            <div className="mx-1">{item.quantity}</div>
            <div
              className="btn p-0"
              onClick={() =>
                dispatch(
                  updateItem({
                    itemIndex: i,
                    key: "quantity",
                    value: item.quantity + 1,
                  })
                )
              }
            >
              <PlusSquare color="#FE9D2B" />
            </div>
          </div>
        </div>
      </div>
      {i != cartItemsLength - 1 && <hr className="my-2" />}
    </>
  );
};

const Cart = (props) => {
  const { cartItems, cartTotal } = useSelector((state) => state.cart);
  const cartItemsLength = cartItems.length;

  useEffect(() => {
    checkoutContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const checkoutContainerRef = useRef(null);

  const history = useHistory();

  return (
    <div className="d-flex flex-column justify-content-between flex-grow-1">
      <div className="px-3">
        {cartItems.map((item, i) => (
          <CartItem
            key={i}
            item={item}
            i={i}
            cartItemsLength={cartItemsLength}
          />
        ))}
      </div>
      <div
        ref={checkoutContainerRef}
        className="d-flex flex-column mt-3"
        style={{ zIndex: 2 }}
      >
        <div className="d-flex justify-content-end me-3">
          <div>Subtotal: </div>
          <div className="btn p-0 ms-2">
            ₦{cartTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div
          className="btn btn-success p-3 rounded-0 mt-3"
          onClick={() => history.push("/checkout")}
        >
          PROCEED TO CHECKOUT
        </div>
      </div>
    </div>
  );
};

export default Cart;
