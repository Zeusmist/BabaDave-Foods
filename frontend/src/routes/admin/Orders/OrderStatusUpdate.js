import { statusColors } from "../../../utils/orders";

const OrderStatusUpdate = (props) => {
  const handleStatusUpdate = (code) => {
    console.log("changed status to ", code);
  };

  return (
    <div>
      {statusColors.map((colorObj, i) => (
        <div key={i} className="justify-content-center">
          {colorObj.codes.map((code, idx) => (
            <div
              key={idx}
              className={`btn btn-${colorObj.color} text-capitalize w-100 mb-3`}
              onClick={() => handleStatusUpdate(code)}
              data-bs-dismiss="modal"
            >
              {code}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderStatusUpdate;
