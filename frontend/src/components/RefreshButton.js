/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { RefreshCw } from "react-feather";

const RefreshButton = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = () => {
    setIsRefreshing(true);
    props.onRefresh(() => setIsRefreshing(false));
  };

  return (
    <div
      className="btn btn-warning rounded-circle p-2 shadow-sm"
      onClick={handleRefresh}
    >
      {isRefreshing ? (
        <div
          className="spinner-border spinner-border-sm text-secondary m-1 border-1"
          role="status"
        ></div>
      ) : (
        <RefreshCw color="#000" />
      )}
    </div>
  );
};

export default RefreshButton;
