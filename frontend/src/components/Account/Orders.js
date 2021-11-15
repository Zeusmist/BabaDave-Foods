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
import Order from "./Order";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const { info } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      await fetchOrders();
      setIsFetching(false);
    })();
  }, []);

  const fetchOrders = async () => {
    console.log({ id: info?.id });
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
    </div>
  );
};

export default Orders;
