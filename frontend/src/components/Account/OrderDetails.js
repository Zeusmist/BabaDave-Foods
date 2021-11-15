import { toMoney } from "../../utils/cart";

/* eslint-disable eqeqeq */
const OrderDetails = (props) => {
  const { data } = props;

  return (
    <ul>
      {data.items.map((item, i) => (
        <li key={i} className="mb-2">
          <div>
            {item.quantity} plate
            {item.quantity > 1 || item.quantity == 0 ? "s" : ""} of {item.title}
          </div>
          <div>{toMoney(item.quantity * item.price)}</div>
        </li>
      ))}
    </ul>
  );
};

export default OrderDetails;
