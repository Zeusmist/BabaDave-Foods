/* eslint-disable eqeqeq */
import {
  Calendar,
  DollarSign,
  Home,
  Mail,
  Percent,
  Phone,
  Truck,
  User,
} from "react-feather";
import ModalContainer from "../../../components/ModalContainer";
import ModalTrigger from "../../../components/ModalTrigger";
import SubInfos from "../../../components/SubInfos";
import { toMoney } from "../../../utils/cart";
import { orderStatuses } from "../../../utils/orders";
import OrderItems from "./OrderItems";
import OrderStatusUpdate from "./OrderStatusUpdate";

const Order = (props) => {
  const { data } = props;

  const userInfo = [
    { label: data?.name ?? "No name", Icon: User },
    { label: data?.address ?? "No address", Icon: Home },
    { label: data?.phone ?? "No phone", Icon: Phone },
    { label: data?.email ?? "No email", Icon: Mail },
  ];

  const orderInfo = [
    { label: toMoney(data?.total), Icon: DollarSign, iconLabel: "Total paid" },
    {
      label: toMoney(data?.discountAmount),
      Icon: Percent,
      iconLabel: "Discount applied",
    },
    {
      label: toMoney(Number(data?.deliveryFee ?? 0)),
      Icon: Truck,
      iconLabel: "Delivery fee",
    },
  ];

  const orderDate = new Date(data.createdAt.seconds * 1000);

  const updateStatusModal = "updateStatusModal" + data.id;
  const orderItemsModal = "orderItemsModal" + data.id;

  return (
    <>
      <div className="m-4 border border-2 rounded p-2">
        <div className="border-bottom border-2 pb-2">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex flex-wrap">
              <Calendar />{" "}
              <div className="ms-1 fw-bold">
                {orderDate.toLocaleTimeString("en-US", { timeStyle: "short" })},{" "}
                {orderDate.toLocaleDateString("en-US", { dateStyle: "medium" })}
              </div>
            </div>
            <div className="mt-1 d-flex">
              <ModalTrigger target={`#${updateStatusModal}`}>
                <div className="btn btn-sm btn-outline-secondary rounded me-2">
                  Update status
                </div>
              </ModalTrigger>
              <ModalTrigger target={`#${orderItemsModal}`}>
                <div className="btn btn-sm btn-outline-secondary border-2">
                  View Order
                </div>
              </ModalTrigger>
            </div>
          </div>

          <div className="mt-1">
            <div className="d-flex align-items-center">
              <div
                className={`bg-${
                  orderStatuses.find(
                    (status) => status.code == data?.status?.code
                  )?.color ?? "secondary"
                } p-2 rounded-circle`}
              ></div>
              <div className="ms-1 text-capitalize">{data?.status?.code}</div>
            </div>
          </div>
        </div>

        <div>
          <SubInfos subInfos={userInfo} />
        </div>

        <div>
          <SubInfos subInfos={orderInfo} />
        </div>
      </div>

      {/* UPDATE STATUS MODAL */}
      <ModalContainer id={updateStatusModal}>
        <OrderStatusUpdate id={data.id} onUpdateStatus={props.onUpdateStatus} />
      </ModalContainer>

      {/* ORDER ITEMS MODAL */}
      <ModalContainer id={orderItemsModal}>
        <OrderItems items={data?.items ?? []} />
      </ModalContainer>
    </>
  );
};

export default Order;
