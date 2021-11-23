/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import RefreshButton from "../../../components/RefreshButton";
import { db } from "../../../config";
import Order from "./Order";
import ModalContainer from "../../../components/ModalContainer";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

  const fetchOrders = async () => {
    console.log("fetching orders");
    let __orders = [];
    await getDocs(
      query(
        collection(db, "orders"),
        // where("status", "!=", "completed"),
        orderBy("createdAt", "asc")
      )
    )
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          __orders.push({ id: doc.id, ...doc.data() });
        });
        setOrders(__orders);
      })
      .catch((err) => console.log(err));
  };

  const handleRequest = () => {};

  console.log("rendered orders");

  return (
    <div>
      {orders.map((order, i) => (
        <div key={i}>
          <Order data={order} />
        </div>
      ))}
      <div className="position-fixed" style={{ bottom: 10, right: 10 }}>
        <RefreshButton onRefresh={handleRequest} />
      </div>
      <ModalContainer />
    </div>
  );
};

export default Orders;
