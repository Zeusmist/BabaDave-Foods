/* eslint-disable eqeqeq */
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Mail, Phone, ShoppingBag } from "react-feather";
import { useSelector } from "react-redux";
import defaultLogo from "../../assets/images/default-user-icon.png";
import "./styles.scss";

const Header = (props) => {
  const { info } = useSelector((state) => state.user);
  const totalOrders = info?.totalOrders || "0";

  const [isEditing, setIsEditing] = useState(false);

  const subInfos = [
    {
      label: `${totalOrders} Order${
        (totalOrders > 1 || totalOrders) == 0 ? "s" : ""
      }`,
      Icon: ShoppingBag,
    },
    { label: info?.phone ?? "No phone provided", Icon: Phone },
    { label: info?.email ?? "No email provided", Icon: Mail },
  ];

  const buttons = [
    {
      id: "edit",
      label: isEditing ? "Close edit" : "Edit Profile",
      onClick: () => setIsEditing(!isEditing),
    },
    { label: "Orders", onClick: () => {} },
    { label: "Addresses", onClick: () => {} },
    { id: "logout", label: "Logout", onClick: props.handleLogout },
  ];

  return (
    <Row md="auto" className="header-container align-items-center m-0">
      <div className="d-flex justify-content-center ">
        <div
          href="/"
          className="rounded"
          style={{ border: "5px solid #dadada" }}
        >
          <img src={defaultLogo} className="header-image" alt="profile pic" />
        </div>
      </div>
      <Col md="auto">
        <div className="header-description">
          <div className="fw-bold fst-italic fs-1">
            {info?.firstName} {info?.lastName}
          </div>
        </div>
        <div className="header-buttons d-flex pt-2 flex-wrap">
          {subInfos.map((si, i) => (
            <div
              key={i}
              className={`d-flex align-items-center ${i > 0 && "ms-2"}`}
            >
              <div
                className="p-1 m-1 lh-1 rounded"
                style={{
                  border: "1px solid #c0c0c0",
                }}
              >
                <si.Icon className="" size={16} />
              </div>
              <div>{si.label}</div>
            </div>
          ))}
        </div>
        <div className="header-buttons d-flex pt-2 flex-wrap mt-2">
          {/* Buttons */}
          {buttons
            .filter((si) => (isEditing ? si.id == "edit" : true))
            .map((b, i) => (
              <div
                className={`button border-0 btn btn${`-outline-${
                  isEditing
                    ? "success"
                    : b.id == "logout"
                    ? "danger"
                    : "secondary"
                }`} p-1 ${i > 0 && "ms-2"} m-1`}
                onClick={b.onClick}
                style={{ background: "none" }}
              >
                {b.label}
              </div>
            ))}
          <div></div>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
