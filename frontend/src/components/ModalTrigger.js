const ModalTrigger = ({ target, children }) => {
  return (
    <div data-bs-toggle="modal" data-bs-target={target}>
      {children}
    </div>
  );
};

export default ModalTrigger;
