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
import LoadMoreTrigger from "../LoadMoreTrigger";
import RefreshButton from "../RefreshButton";
import Order from "./Order";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [lastVisibleDocument, setLastVisibleDocument] = useState(null);

  const { info } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

  const collectionPath = "orders";
  const whereVariables = ["userID", "==", info?.id];
  const orderByVariables = ["createdAt", "desc"];
  const limitLength = 5;

  const fetchOrders = async () => {
    setIsFetching(true);
    if (info?.id) {
      await getDocs(
        query(
          collection(db, collectionPath),
          where(...whereVariables),
          orderBy(...orderByVariables),
          limit(limitLength)
        )
      )
        .then((orders_snapshot) => {
          const fetched_orders = [];
          orders_snapshot.forEach((doc) => {
            fetched_orders.push({ id: doc.id, ...doc.data() });
          });
          setOrders(fetched_orders);

          if (orders_snapshot.docs.length > 0) {
            setLastVisibleDocument(
              orders_snapshot.docs[orders_snapshot.docs.length - 1]
            );
          }
        })
        .catch((err) => console.log(err));
    }
    setIsFetching(false);
  };

  const handleNewData = (newOrders, newLastDoc) => {
    setOrders([...orders, ...newOrders]);
    if (newLastDoc) setLastVisibleDocument(newLastDoc);
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
        {/* {orders.length >= 5 && ( */}
        {true && (
          <LoadMoreTrigger
            collectionPath={collectionPath}
            whereVariables={whereVariables}
            orderByVariables={orderByVariables}
            lastVisibleDocument={lastVisibleDocument}
            limitLength={limitLength}
            handleNewData={handleNewData}
          >
            <div
              className="d-flex justify-content-center mb-2"
              style={{ cursor: "pointer" }}
            >
              Load older orders
            </div>
          </LoadMoreTrigger>
        )}
      </div>
      <div className="position-fixed" style={{ bottom: 10, right: 10 }}>
        <RefreshButton onRefresh={fetchOrders} />
      </div>
    </div>
  );
};

export default Orders;
