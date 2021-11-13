/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs, where } from "@firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../config";
import Order from "./Order";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (startFrom) => {
    const orders_snapshot = await getDocs(
      collection(db, "orders"),
      where("userID", "==", props.userID)
    );

    let updatedState = orders;
    const fetched_orders = [];

    orders_snapshot.forEach((doc) => {
      fetched_orders.push({ id: doc.id, ...doc.data() });
    });
    fetched_orders.forEach((o, i) => {
      updatedState[i] = o;
    });
    setOrders(updatedState);
  };

  return (
    <div>
      <div>
        {orders.map((o, i) => (
          <div key={i}>
            <Order />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
