/* eslint-disable eqeqeq */
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { db } from "../../config";
import { resetCart, setAdditionalInfo } from "../../redux/slices/cart";
import { toMoney } from "../../utils/cart";
import { delivery_polygons } from "../../utils/map";
import AddressFinder from "../Address/AddressFinder";
import { renderInformationFlex, RenderSection } from "./utils";

// TODO: handle check discount, calculate and include delivery fee, handle checkout & clear cart from local storage

const google = window.google;

const Checkout = (props) => {
  const { info } = useSelector((state) => state.user);
  const { cartTotal, cartItems, additionalInfo } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderInfo, setOrderInfo] = useState([
    { id: "subtotal", label: "Subtotal", value: toMoney(cartTotal) },
    { id: "discount", label: "Discount", value: toMoney(discountAmount) },
    { id: "delivery", label: "Delivery Fee", value: toMoney(deliveryFee) },
  ]);
  const [polygons, setPolygons] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const userData = [
    { label: "Full name", value: `${info?.firstName} ${info?.lastName}` },
    { label: "Email", value: info?.email },
    { label: "Phone", value: info?.phone },
  ];

  useEffect(() => {
    while (!google) setTimeout(() => {}, 300);
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
      setDiscountAmount(
        Number((cartTotal * (discountPercentage / 100)).toFixed(2))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountPercentage]);

  useEffect(() => {
    if (discountAmount) {
      const discountIndex = orderInfo.findIndex((od) => od.id == "discount");
      let updated = orderInfo;
      updated[discountIndex].value = `${toMoney(
        discountAmount
      )} (${discountPercentage}%)`;
      setOrderInfo([...updated]);
    }
    if (deliveryFee) {
      const discountIndex = orderInfo.findIndex((od) => od.id == "delivery");
      let updated = orderInfo;
      updated[discountIndex].value = toMoney(deliveryFee);
      setOrderInfo([...updated]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountAmount, deliveryFee]);

  const applyDiscount = (e) => {
    e.preventDefault();
    // check discountCode validity

    setDiscountPercentage(10);
    setDiscountCode("");
  };

  const processLocation = (address) => {
    setSelectedAddress(address);

    const coords = address?.coords;
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

  const checkoutPrice = Number(
    (cartTotal - discountAmount + Number(deliveryFee)).toFixed(2)
  );

  const handleCheckout = async () => {
    // send data to database and cleanup client on success
    const orderData = {
      userID: info.id,
      name: info?.firstName + " " + info?.lastName,
      email: info?.email,
      phone: info?.phone,
      address: selectedAddress.addressAsText,
      items: cartItems,
      additionalInfo,
      cartTotal: Number(cartTotal.toFixed(2)),
      discountAmount: discountAmount,
      deliveryFee: deliveryFee,
      total: checkoutPrice,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "orders"), orderData)
      .then((docRef) => {
        dispatch(resetCart());
        dispatch(setAdditionalInfo(""));
        history.push("/my-account");
      })
      .catch((err) => {
        console.log(err);
        alert("an error occurred during checkout");
      });
  };

  const paystackProps = {
    email: info?.email,
    amount: checkoutPrice * 100,
    metadata: {
      name: info?.firstName + " " + info?.lastName,
      phone: info?.phone,
    },
    publicKey: "",
    text: "Make Payment",
    onSuccess: () => {
      handleCheckout();
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <div>
      <RenderSection title="Contact Details">
        {renderInformationFlex(userData)}
      </RenderSection>

      <RenderSection title="Delivery Address">
        <AddressFinder processLocation={processLocation} />
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
              orderInfo
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
        <PaystackButton
          className="btn btn-success btn-lg w-100 mt-5"
          {...paystackProps}
        />
        <button onClick={handleCheckout}>SU</button>
      </RenderSection>
    </div>
  );
};

export default Checkout;
