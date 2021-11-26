/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config";

const LoadMoreTrigger = ({
  collectionPath,
  whereVariables,
  orderByVariables,
  lastVisibleDocument,
  limitLength,
  handleNewData,
  children,
}) => {
  const [queryObjects, setQueryObjects] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    console.log("UPDATING LAST VISIBLE DOC");
    createQuery();
  }, [lastVisibleDocument]);

  const createQuery = () => {
    if (collectionPath && lastVisibleDocument && limitLength) {
      let objects = [collection(db, collectionPath)];
      if (whereVariables) objects.push(where(...whereVariables));
      if (orderByVariables) objects.push(orderBy(...orderByVariables));
      objects.push(startAfter(lastVisibleDocument));
      objects.push(limit(limitLength));

      setQueryObjects(objects);
    } else
      console.log(
        "Cannot create load more query due to incomplete requirements"
      );
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    if (queryObjects) {
      await getDocs(query(...queryObjects))
        .then((docsSnapshot) => {
          const fetchedDocs = [];
          docsSnapshot.forEach((doc) => {
            fetchedDocs.push({ id: doc.id, ...doc.data() });
          });

          let newLastDoc;
          if (docsSnapshot.docs.length > 0)
            newLastDoc = docsSnapshot.docs[docsSnapshot.docs.length - 1];

          console.log({ fetchedDocs, newLastDoc });
          handleNewData(fetchedDocs, newLastDoc);

          setIsEmpty(true);
          setTimeout(() => setIsEmpty(false), 500);
        })
        .catch((err) => {
          alert("unable to load more");
          console.log(err);
        });
    } else console.log("queryObjects missing");
    setIsLoading(false);
  };

  return (
    <div
      onClick={handleLoadMore}
      className="d-flex flex-column align-items-center"
    >
      {isLoading ? (
        <div
          className="spinner-border spinner-border-sm text-secondary border-1"
          role="status"
        ></div>
      ) : (
        isEmpty && <div>End of list</div>
      )}
      {children}
    </div>
  );
};

export default LoadMoreTrigger;
