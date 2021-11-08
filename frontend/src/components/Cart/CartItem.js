/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useDispatch } from "react-redux";
import { MinusSquare, PlusSquare, X } from "react-feather";
import { removeItem, updateItem } from "../../redux/slices/cart";
import { useEffect } from "react";
import { toMoney } from "../../utils/cart";

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
          <div>{toMoney(item.price * item.quantity)}</div>
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

export default CartItem;
