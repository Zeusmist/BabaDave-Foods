/* eslint-disable eqeqeq */

const OrderItems = (props) => {
  const { items } = props;

  return (
    <ul>
      {items.map((item, i) => (
        <li key={i} className="mb-2">
          <div>
            {item.quantity} plate
            {item.quantity > 1 || item.quantity == 0 ? "s" : ""} of {item.title}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OrderItems;
