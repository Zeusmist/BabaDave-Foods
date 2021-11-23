const SubInfos = ({ subInfos, className = "" }) => {
  return (
    <div className={`${className} d-flex pt-2 flex-wrap`}>
      {subInfos.map((si, i) => (
        <div key={i} className={`d-flex align-items-center`}>
          <div
            className={`p-1 m-1 lh-1 ${!si.iconLabel ? "rounded" : ""}`}
            style={{
              border: !si.iconLabel ? "1px solid #c0c0c0" : "none",
            }}
          >
            {!si.iconLabel ? (
              <si.Icon className="" size={16} />
            ) : (
              <div className="fw-bold">{si.iconLabel}:</div>
            )}
          </div>
          <div>{si.label}&nbsp;&nbsp;</div>
        </div>
      ))}
    </div>
  );
};

export default SubInfos;
