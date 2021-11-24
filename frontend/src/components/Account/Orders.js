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
import { useSelector } from "react-redux";
import { db } from "../../config";
import RefreshButton from "../RefreshButton";
import Order from "./Order";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const { info } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

  const fetchOrders = async () => {
    setIsFetching(true);
    if (info?.id) {
      await getDocs(
        query(
          collection(db, "orders"),
          where("userID", "==", info?.id),
          orderBy("createdAt", "desc"),
          limit(5)
        )
      )
        .then((orders_snapshot) => {
          let updatedState = orders;
          const fetched_orders = [];

          orders_snapshot.forEach((doc) => {
            fetched_orders.push({ id: doc.id, ...doc.data() });
          });
          fetched_orders.forEach((o, i) => {
            updatedState[i] = o;
          });
          setOrders(updatedState);
        })
        .catch((err) => console.log(err));
    }
    setIsFetching(false);
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-center mt-3">
          {isFetching && (
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        {orders.map((o, i) => (
          <div key={i}>
            <Order data={o} />
          </div>
        ))}
      </div>
      <div className="position-fixed" style={{ bottom: 10, right: 10 }}>
        <RefreshButton onRefresh={fetchOrders} />
      </div>
    </div>
  );
};

export default Orders;
