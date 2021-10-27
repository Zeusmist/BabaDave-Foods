import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Checkout = (props) => {
  const { info } = useSelector((state) => state.user);
  const userData = [
    { label: "Full name", value: `${info?.firstName} ${info?.lastName}` },
    { label: "Email", value: info?.email },
    { label: "Phone", value: info?.phone },
  ];

  const headerClassName = "fs-4 fw-bold mb-2";
  return (
    <div>
      <div className="m-3 mt-0">
        <div className={headerClassName}>Contact Details</div>
        <div className="d-flex">
          <div className="me-3">
            {userData.map((data, i) => (
              <div key={i} className="fw-bold">
                {data.label}:
              </div>
            ))}
          </div>
          <div>
            {userData.map((data, i) => (
              <div key={i} className="fw-light">
                {data.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={headerClassName}>Delivery Address</div>

      <div className={headerClassName}>Payment Method</div>

      <div></div>
    </div>
  );
};

export default Checkout;
