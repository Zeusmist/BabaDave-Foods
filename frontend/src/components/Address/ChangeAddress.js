/* eslint-disable eqeqeq */
import { useState } from "react";
import { MapPin } from "react-feather";
import { useSelector } from "react-redux";
import NewAddressForm from "./NewAddressForm";

const ChangeAddress = (props) => {
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  let { addresses } = useSelector((state) => state.user);

  const addressesLength = addresses.length;

  return (
    <div>
      {addressesLength > 0 && (
        <ul
          className="list-group overflow-auto mb-2"
          style={{ maxHeight: "100px" }}
        >
          {addresses.map((address, i) => (
            <li
              key={i}
              className="list-group-item py-1 px-2 d-flex align-items-center text-capitalize"
              style={{ cursor: "pointer" }}
              onClick={() => props.onComplete(address.id)}
            >
              <MapPin size={14} strokeWidth={3} className="me-1" />{" "}
              {address.number ? address.number + " ," : ""} {address.street}
            </li>
          ))}
        </ul>
      )}

      {addressesLength > 0 && !addingNewAddress ? (
        <div
          className="btn btn-sm btn-secondary"
          onClick={() => setAddingNewAddress(true)}
        >
          Add new address
        </div>
      ) : (
        <NewAddressForm onCancel={() => setAddingNewAddress(false)} />
      )}
    </div>
  );
};

export default ChangeAddress;
