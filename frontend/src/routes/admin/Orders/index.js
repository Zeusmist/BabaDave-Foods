/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import RefreshButton from "../../../components/RefreshButton";
import { db } from "../../../config";
import Order from "./Order";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

  const fetchOrders = async () => {
    setIsFetching(true);
    let __orders = [];
    await getDocs(
      query(
        collection(db, "orders"),
        where("status.code", "==", "pending"),
        orderBy("createdAt", "asc"),
        limit(5)
      )
    )
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          __orders.push({ id: doc.id, ...doc.data() });
        });
        setOrders(__orders);
      })
      .catch((err) => console.log(err));
    setIsFetching(false);
  };

  const handleStatusUpdate = (id, newStatus) => {
    let updatedState = [...orders];
    const updatedIndex = updatedState.findIndex((order) => order.id == id);
    if (updatedIndex > -1) {
      updatedState[updatedIndex].status = newStatus;
      setOrders([...updatedState]);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
        {isFetching && (
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      {orders.map((order, i) => (
        <div key={i}>
          <Order
            data={order}
            onUpdateStatus={(newStatus) =>
              handleStatusUpdate(order.id, newStatus)
            }
          />
        </div>
      ))}
      <div className="position-fixed" style={{ bottom: 10, right: 10 }}>
        <RefreshButton onRefresh={fetchOrders} />
      </div>
    </div>
  );
};

export default Orders;
