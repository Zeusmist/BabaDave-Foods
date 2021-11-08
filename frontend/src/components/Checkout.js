/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toMoney } from "../utils/cart";
import { delivery_polygons } from "../utils/map";
import AddressFinder from "./Address/AddressFinder";

// TODO: handle check discount, calculate and include delivery fee, handle checkout & clear cart from local storage

const google = window.google;

const RenderSection = (p) => {
  return (
    <div className="m-4 mt-0">
      <div className="fs-5 fw-bold mb-2">{p.title}</div>
      {p.children}
    </div>
  );
};

const renderInformationFlex = (dataList) => (
  <div className="d-flex">
    <div className="me-3">
      {dataList.map((data, i) => (
        <div key={i} className={`${data.id == "total" && "mt-3"} fw-bold`}>
          {data.label}:
        </div>
      ))}
    </div>
    <div>
      {dataList.map((data, i) => (
        <div
          key={i}
          className={`${data.id == "total" ? "fw-bold mt-3" : "fw-light"}`}
        >
          {data.value}
        </div>
      ))}
    </div>
  </div>
);

const Checkout = (props) => {
  const { info } = useSelector((state) => state.user);
  const { cartTotal } = useSelector((state) => state.cart);

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderData, setOrderData] = useState([
    { id: "subtotal", label: "Subtotal", value: toMoney(cartTotal) },
    { id: "discount", label: "Discount", value: toMoney(discountAmount) },
    { id: "delivery", label: "Delivery Fee", value: toMoney(deliveryFee) },
  ]);
  const [polygons, setPolygons] = useState([]);

  const userData = [
    { label: "Full name", value: `${info?.firstName} ${info?.lastName}` },
    { label: "Email", value: info?.email },
    { label: "Phone", value: info?.phone },
  ];

  useEffect(() => {
    let _polygons = [];
    delivery_polygons.forEach((dp) => {
      const polygon = new google.maps.Polygon({
        paths: dp.coords,
      });
      _polygons.push({ id: dp.id, polygon });
    });
    setPolygons(_polygons);
  }, []);

  useEffect(() => {
    if (discountPercentage) {
      setDiscountAmount(cartTotal * (discountPercentage / 100));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountPercentage]);

  useEffect(() => {
    if (discountAmount) {
      const discountIndex = orderData.findIndex((od) => od.id == "discount");
      let updated = orderData;
      updated[discountIndex].value = `${toMoney(
        discountAmount
      )} (${discountPercentage}%)`;
      setOrderData([...updated]);
    }
    if (deliveryFee) {
      console.log({ deliveryFee });
      const discountIndex = orderData.findIndex((od) => od.id == "delivery");
      let updated = orderData;
      updated[discountIndex].value = toMoney(deliveryFee);
      setOrderData([...updated]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountAmount, deliveryFee]);

  const applyDiscount = (e) => {
    e.preventDefault();
    // check discountCode validity

    setDiscountPercentage(10);
    setDiscountCode("");
  };

  const handleCheckout = () => {};

  const determineDeliveryFee = (selectedAddress) => {
    const coords = selectedAddress?.coords;
    let polygonForCoords = {};
    if (coords) {
      polygonForCoords = polygons.find((p) =>
        google.maps.geometry.poly.containsLocation(
          new google.maps.LatLng(coords.lat, coords.lng),
          p.polygon
        )
      );
    }
    const fee =
      delivery_polygons.find((dp) => dp.id == polygonForCoords?.id)
        ?.delivery_fee ?? "0";
    setDeliveryFee(fee);
  };

  const checkoutPrice = cartTotal - discountAmount + deliveryFee;

  return (
    <div>
      <RenderSection title="Contact Details">
        {renderInformationFlex(userData)}
      </RenderSection>

      <RenderSection title="Delivery Address">
        <AddressFinder processLocation={determineDeliveryFee} />
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
              orderData
                .concat([
                  {
                    id: "total",
                    label: "Total",
                    value: toMoney(checkoutPrice),
                  },
                ])
                .filter((od) =>
                  od.id == "discount" ? discountAmount > 0 : true
                )
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
