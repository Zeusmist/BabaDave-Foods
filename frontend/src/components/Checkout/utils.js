/* eslint-disable eqeqeq */
export const renderInformationFlex = (dataList) => (
  <div className="d-flex">
    <div className="me-3">
      {dataList.map((data, i) => (
        <div key={i} className={`${data.id == "total" && "mt-3"} fw-bold`}>
          {data.label}:
        </div>
      ))}
    </div>
    <div>
      {dataList.map((data, i) => (
        <div
          key={i}
          className={`${data.id == "total" ? "fw-bold mt-3" : "fw-light"}`}
        >
          {data.value}
        </div>
      ))}
    </div>
  </div>
);

export const RenderSection = (p) => {
  return (
    <div className="m-4 mt-0">
      <div className="fs-5 fw-bold mb-2">{p.title}</div>
      {p.children}
    </div>
  );
};
