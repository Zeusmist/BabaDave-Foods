/* eslint-disable react-hooks/exhaustive-deps */
import { RefreshCw } from "react-feather";

const RefreshButton = (props) => {
  const handleRefresh = () => {
    props.onRefresh();
  };

  return (
    <div
      className="btn btn-warning rounded-circle p-2 shadow-sm"
      onClick={handleRefresh}
    >
      <RefreshCw color="#000" />
    </div>
  );
};

export default RefreshButton;
