/* eslint-disable eqeqeq */
import { useEffect, useRef, useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { auth, db } from "../../config";
import { addAddress } from "../../redux/slices/user";
import { useDispatch } from "react-redux";
let google = window.google;
let map, service, startingPoint;

const NewAddressForm = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [newAddress, setNewAddress] = useState(null);
  const [addressInputIsFocused, setAddressInputIsFocused] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const mapRef = useRef();
  const dispatch = useDispatch();

  const initMap = () => {
    startingPoint = new google.maps.LatLng(6.5584, 3.3915);
    map = new google.maps.Map(mapRef.current, {
      center: startingPoint,
      zoom: 15,
    });
    service = new google.maps.places.PlacesService(map);
  };

  useEffect(() => {
    if (!service || !map) {
      initMap();
    }
  }, []);

  const handleAddressInput = (e) => {
    if (service && map) {
      const value = e.target.value;
      setNewAddress(null);

      setSearchValue(value);
      if (value.length > 2) {
        var request = {
          query: value,
          location: startingPoint,
          type: ["address"],
        };

        // convert to this when users scale // service.findPlaceFromQuery(request, (results, status) => {
        service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setSearchResults(results);
            map.setCenter(results[0].geometry.location);
          }
        });
      }
    } else console.log("NO SERVICE");
  };

  const handleStreetNumberInput = (e) =>
    setNewAddress({ ...(newAddress ?? {}), number: e.target.value });

  const handleSelectAddress = (address) => {
    setNewAddress({
      ...(newAddress ?? {}),
      street: address,
    });
    cleanSearch();
  };

  const formatAddress = (address) => {
    return address.formatted_address.replace(/[0-9]/g, "");
  };

  const cleanSearch = () => setSearchValue("");

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSavingAddress(true);
    let newAddressID;
    if (newAddress) {
      const { uid } = auth.currentUser;
      await addDoc(collection(db, `users/${uid}/addresses`), newAddress)
        .then((docRef) => {
          newAddressID = docRef.id;
          dispatch(
            addAddress({ address: { id: newAddressID, ...newAddress } })
          );
          if (props.onComplete) props.onComplete(newAddressID);
        })
        .catch((err) => {
          console.log(err);
          alert("an error occurred while adding address");
        });
    }
    setIsSavingAddress(false);
  };

  return (
    <form onSubmit={handleSaveAddress}>
      <div ref={mapRef} style={{ display: "none" }}></div>
      <label className="form-label mb-0">Street Name</label>
      <input
        type="text"
        className="form-control"
        onChange={handleAddressInput}
        onFocus={() => setAddressInputIsFocused(true)}
        onBlur={() => setAddressInputIsFocused(false)}
        value={newAddress?.street}
      />
      {addressInputIsFocused &&
        searchValue.length > 2 &&
        searchResults?.length > 0 && (
          <div
            className="overflow-auto p-2"
            style={{ maxHeight: "150px", backgroundColor: "#fff" }}
          >
            {searchResults.map((res, i) => (
              <div
                key={i}
                className="border-bottom py-2"
                style={{ cursor: "pointer" }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectAddress(formatAddress(res));
                }}
              >
                {formatAddress(res)}
              </div>
            ))}
          </div>
        )}
      <label className="form-label mb-0 mt-1">Street Number</label>
      <input
        type="text"
        className="form-control"
        onChange={handleStreetNumberInput}
      />
      <div className="d-flex mt-2">
        <div
          className="btn btn-sm btn-danger me-2"
          onClick={() => props.onCancel()}
        >
          Cancel
        </div>
        <input
          type="submit"
          value={isSavingAddress ? "Saving..." : "Save"}
          className="btn btn-sm btn-success"
        />
      </div>
    </form>
  );
};

export default NewAddressForm;
