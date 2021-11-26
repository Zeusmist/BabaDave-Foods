/* eslint-disable eqeqeq */

const OrderItems = (props) => {
  const { items } = props;
  const headerClassname = "fw-bold fs-5 text-decoration-underline";

  return (
    <div>
      <div className={headerClassname}>Items</div>
      <ul>
        {items.map((item, i) => (
          <li key={i} className="mb-2">
            <div>
              {item.quantity} plate
              {item.quantity > 1 || item.quantity == 0 ? "s" : ""} of{" "}
              {item.title}
            </div>
          </li>
        ))}
      </ul>

      <div className="">
        <div className={headerClassname}>Additional Information</div>
        <div>{props?.additionalInfo ?? "None provided"}</div>
      </div>
    </div>
  );
};

export default OrderItems;
