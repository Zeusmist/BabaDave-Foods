/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect } from "react";
import { useState } from "react";
import { toMoney } from "../../utils/cart";
import ModalContainer from "../ModalContainer";
import OrderDetails from "./OrderDetails";
import defaultFoodIcon from "../../assets/images/default-food-icon.png";
import { orderStatuses } from "../../utils/orders";
import ModalTrigger from "../ModalTrigger";

const Order = (props) => {
  const { data } = props;

  const [mainItem, setMainItem] = useState({ quantity: 0, price: 0 });
  const orderDetailsModal = "orderDetailsModal" + data.id;

  useEffect(() => {
    // set mainItem, most expensive item (quantity * price)
    console.log({ data });
    data.items.forEach((item) => {
      if (item.quantity * item.price > mainItem.quantity * mainItem.price)
        setMainItem(item);
    });
  }, []);

  return (
    <>
      <div className="d-flex my-3 mx-4 align-items-center border rounded p-2 border-2">
        <div className="">
          <img src={defaultFoodIcon} className="food-image" alt="food pic" />
        </div>
        <div className="ms-3">
          <div className="d-flex align-items-baseline flex-wrap">
            <div className="fw-bold fs-4">
              {mainItem.quantity} plate
              {mainItem.quantity > 1 || mainItem.quantity == 0
                ? "s"
                : ""} of {mainItem.title}&nbsp;
            </div>
            {data.items.length > 1 && (
              <ModalTrigger target={`#${orderDetailsModal}`}>
                <div className="moreBtn" style={{ cursor: "pointer" }}>
                  and {data.items.length - 1} more...
                </div>
              </ModalTrigger>
            )}
          </div>
          <div className="fw-bold my-2">{toMoney(data.total)}</div>
          <div className="d-flex align-items-center">
            <div
              className={`bg-${
                orderStatuses.find(
                  (status) => status.code == data?.status?.code
                )?.color ?? "secondary"
              } p-2 rounded-circle`}
            ></div>
            <div className="ms-1">
              {data?.status?.label ?? "Status pending"}
            </div>
          </div>
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      <ModalContainer id={orderDetailsModal}>
        <OrderDetails data={data} />
      </ModalContainer>
    </>
  );
};

export default Order;
