/* eslint-disable eqeqeq */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  lagos_coords,
  mainland_level1_coords,
  office_coords,
} from "../utils/map";
import AddressFinder from "./Address/AddressFinder";

// TODO: handle check discount, calculate and include delivery fee, handle checkout & clear cart from local storage

let map;

const RenderSection = (p) => {
  return (
    <div className="m-4 mt-0">
      <div className="fs-5 fw-bold mb-2">{p.title}</div>
      {p.children}
    </div>
  );
};

const toMoney = (numberVal) =>
  `₦${numberVal.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;

const Checkout = (props) => {
  const { info } = useSelector((state) => state.user);
  const { cartTotal } = useSelector((state) => state.cart);

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(null);
  const initialOrderData = [{ label: "Subtotal", value: toMoney(cartTotal) }];
  const [orderData, setOrderData] = useState(initialOrderData);
  const [checkoutPrice, setCheckoutPrice] = useState(cartTotal);

  const userData = [
    { label: "Full name", value: `${info?.firstName} ${info?.lastName}` },
    { label: "Email", value: info?.email },
    { label: "Phone", value: info?.phone },
  ];

  useEffect(() => {
    if (discountPercentage) {
      setDiscountAmount(cartTotal * (discountPercentage / 100));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountPercentage]);

  useEffect(() => {
    if (discountAmount) {
      console.log("order data", orderData);
      setOrderData([
        ...initialOrderData,
        {
          type: "discount",
          label: "Discount",
          value: toMoney(discountAmount) + ` (${discountPercentage}%)`,
        },
      ]);
      setCheckoutPrice(cartTotal - discountAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountAmount]);

  const applyDiscount = (e) => {
    e.preventDefault();
    // check discountCode validity

    setDiscountPercentage(10);
    setDiscountCode("");
  };

  const handleCheckout = () => {};

  const renderInformationFlex = (dataList) => (
    <div className="d-flex">
      <div className="me-3">
        {dataList.map((data, i) => (
          <div key={i} className="fw-bold">
            {data.label}:
          </div>
        ))}
      </div>
      <div>
        {dataList.map((data, i) => (
          <div key={i} className={`${data.isTotal ? "fw-bold" : "fw-light"}`}>
            {data.value}
          </div>
        ))}
      </div>
    </div>
  );

  // CODE BELOW IS FOR TESTING MAP LOGIC
  const mapRef = useRef();
  useEffect(() => {
    map = new window.google.maps.Map(mapRef.current, {
      center: office_coords,
      zoom: 11,
    });

    // const cityCircle = new window.google.maps.Circle({
    //   map,
    //   center: lagos_coords,
    //   radius: 20000,
    // });
    const polygon = new window.google.maps.Polygon({
      paths: mainland_level1_coords,
    });
    polygon.setMap(map);
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ height: 300, width: "100%" }}></div>

      <RenderSection title="Contact Details">
        {renderInformationFlex(userData)}
      </RenderSection>

      <RenderSection title="Delivery Address">
        <AddressFinder />
      </RenderSection>

      <RenderSection title="Order Total">
        <div className="row">
          <div className="col-md mb-3">
            <form
              onSubmit={applyDiscount}
              className="d-flex align-items-center"
            >
              <input
                type="text"
                className="form-control"
                placeholder="Discount code"
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <input
                type="submit"
                className="btn btn-secondary ms-2"
                value="Apply"
              />
            </form>
          </div>

          <div className="col-md" style={{ marginTop: "-5px" }}>
            {renderInformationFlex(
              orderData.concat([
                {
                  label: "Total",
                  value: toMoney(checkoutPrice),
                  isTotal: true,
                },
              ])
            )}
          </div>
        </div>
        <div
          className="btn btn-success btn-lg w-100 mt-5"
          onClick={handleCheckout}
        >
          Make Payment
        </div>
      </RenderSection>
    </div>
  );
};

export default Checkout;
