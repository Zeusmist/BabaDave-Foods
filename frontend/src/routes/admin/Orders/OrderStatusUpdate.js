/* eslint-disable eqeqeq */
import { doc, updateDoc } from "@firebase/firestore";
import { orderStatuses } from "../../../utils/orders";
import { db } from "../../../config";

const OrderStatusUpdate = (props) => {
  const handleStatusUpdate = async (newStatus) => {
    await updateDoc(doc(db, `orders/${props.id}`), {
      status: { code: newStatus.code, label: newStatus.label },
    })
      .then(() => {
        props.onUpdateStatus(newStatus);
      })
      .catch((err) => {
        console.log(err);
        alert("unable to update order status");
      });
  };

  return (
    <div>
      {orderStatuses
        .filter((status) => status.code != "cancelled")
        .map((status, i) => (
          <div key={i} className="justify-content-center">
            <div
              className={`btn btn-${status.color} text-capitalize w-100 mb-3`}
              onClick={() => handleStatusUpdate(status)}
              data-bs-dismiss="modal"
            >
              {status.code}
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderStatusUpdate;
