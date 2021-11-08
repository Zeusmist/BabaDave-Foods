export const toMoney = (numberVal) =>
  `₦${numberVal.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;
