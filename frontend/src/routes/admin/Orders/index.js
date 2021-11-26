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
import LoadMoreTrigger from "../../../components/LoadMoreTrigger";
import RefreshButton from "../../../components/RefreshButton";
import { db } from "../../../config";
import Order from "./Order";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [lastVisibleDocument, setLastVisibleDocument] = useState(null);

  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

  const collectionPath = "orders";
  const whereVariables = ["status.code", "==", "pending"];
  const orderByVariables = ["createdAt", "asc"];
  const limitLength = 5;

  const fetchOrders = async () => {
    setIsFetching(true);

    await getDocs(
      query(
        collection(db, collectionPath),
        where(...whereVariables),
        orderBy(...orderByVariables),
        limit(limitLength)
      )
    )
      .then((querySnapshot) => {
        let __orders = [];
        querySnapshot.forEach((doc) => {
          __orders.push({ id: doc.id, ...doc.data() });
        });
        setOrders(__orders);

        if (querySnapshot.docs.length > 0) {
          setLastVisibleDocument(
            querySnapshot.docs[querySnapshot.docs.length - 1]
          );
        }
      })
      .catch((err) => console.log(err));
    setIsFetching(false);
  };

  const handleNewData = (newOrders, newLastDoc) => {
    setOrders([...orders, ...newOrders]);
    if (newLastDoc) setLastVisibleDocument(newLastDoc);
  };

  const handleStatusUpdate = (id, newStatus) => {
    let updatedState = [...orders];
    const updatedIndex = updatedState.findIndex((order) => order.id == id);
    if (updatedIndex > -1) {
      updatedState[updatedIndex].status = newStatus;
      setOrders([...updatedState]);
    }
  };

  const handleRefresh = async (onComplete) => {
    await fetchOrders();
    onComplete();
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

      {orders.length >= 5 && (
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
            Load newer orders
          </div>
        </LoadMoreTrigger>
      )}

      <div className="position-fixed" style={{ bottom: 10, right: 10 }}>
        <RefreshButton onRefresh={handleRefresh} />
      </div>
    </div>
  );
};

export default Orders;
