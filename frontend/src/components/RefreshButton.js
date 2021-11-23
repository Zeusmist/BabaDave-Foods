/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { RefreshCw } from "react-feather";

const RefreshButton = (props) => {
  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    props.onRefresh();
  };

  return (
    <div className="btn btn-warning rounded-circle p-2 shadow-sm">
      <RefreshCw color="#000" />
    </div>
  );
};

export default RefreshButton;
