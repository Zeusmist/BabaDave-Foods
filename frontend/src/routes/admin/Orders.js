import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  });

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    querySnapshot.forEach((doc) => {
      setOrders([...orders, { id: doc.id, ...doc.data() }]);
    });
  };

  console.log("rendered orders");

  return (
    <div>
      {orders.map((order, i) => (
        <div key={i}>{order.id}</div>
      ))}
    </div>
  );
};

export default Orders;
