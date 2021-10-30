/* eslint-disable eqeqeq */
import { useState } from "react";
import { Home } from "react-feather";
import { useSelector } from "react-redux";
import ChangeAddress from "./ChangeAddress";

const AddressFinder = (props) => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const { addresses } = useSelector((state) => state.user);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0] ?? null);

  const handleNewAddress = (newAddressID) => {
    const index = addresses.findIndex((a) => a.id == newAddressID);
    console.log("imdex: ", newAddressID, "--", index);
    if (index > -1) {
      setSelectedAddress(addresses[index]);
    }
    setIsAddingAddress(false);
  };

  return (
    <div>
      <div
        className={`mb-2 d-flex align-items-center text-capitalize ${
          isAddingAddress && "opacity-25"
        }`}
      >
        {<Home className="me-1" size={20} strokeWidth={3} />}
        {selectedAddress
          ? `${selectedAddress.number ? selectedAddress.number + " ," : ""} ${
              selectedAddress?.street
            }`
          : "No saved address"}
      </div>
      {!isAddingAddress && (
        <div
          className="btn btn-sm btn-secondary"
          style={{ cursor: "pointer" }}
          onClick={() => setIsAddingAddress(!isAddingAddress)}
        >
          {selectedAddress ? "Change Address" : "Add Address"}
        </div>
      )}
      {isAddingAddress && (
        <ChangeAddress
          onComplete={handleNewAddress}
          selectedId={selectedAddress?.id}
        />
      )}
    </div>
  );
};

export default AddressFinder;
