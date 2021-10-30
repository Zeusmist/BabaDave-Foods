import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AddressFinder from "./Address/AddressFinder";

const Checkout = (props) => {
  const { info } = useSelector((state) => state.user);
  const userData = [
    { label: "Full name", value: `${info?.firstName} ${info?.lastName}` },
    { label: "Email", value: info?.email },
    { label: "Phone", value: info?.phone },
  ];

  const RenderSection = (p) => (
    <div className="m-3 mt-0">
      <div className="fs-5 fw-bold mb-2">{p.title}</div>
      {p.children}
    </div>
  );

  return (
    <div>
      <RenderSection title="Contact Details">
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
      </RenderSection>

      <RenderSection title="Delivery Address">
        <AddressFinder />
      </RenderSection>

      <RenderSection title="Payment Method"></RenderSection>
    </div>
  );
};

export default Checkout;
