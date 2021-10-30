import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { cartItems, cartTotal } = useSelector((state) => state.cart);
  const cartItemsLength = cartItems.length;
  const bottomContainerRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    bottomContainerRef.current &&
      bottomContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleAdditionInfo = () => {};

  return (
    <div className="d-flex flex-column justify-content-between flex-grow-1">
      {cartItems.length > 0 ? (
        <>
          <div className="px-3">
            {cartItems.map((item, i) => (
              <CartItem
                key={i}
                item={item}
                i={i}
                cartItemsLength={cartItemsLength}
              />
            ))}
            <div className="mt-3">
              <div className="fs-5 fw-bold mb-2">Additional Information</div>
              <textarea
                className="form-control"
                rows={3}
                onChange={handleAdditionInfo}
                placeholder="Add any comment, eg: allergies, delivery instructions, etc"
              />
            </div>
          </div>
          <div ref={bottomContainerRef}></div>
          <div className="d-flex flex-column mt-3" style={{ zIndex: 2 }}>
            <div className="d-flex justify-content-end me-3 fw-bold">
              <div>Subtotal: </div>
              <div className="btn p-0 ms-2">
                ₦
                {cartTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
            <div
              className="btn btn-success p-3 rounded-0 mt-3"
              onClick={() => history.push("/checkout")}
            >
              PROCEED TO CHECKOUT
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">Cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
