import { useEffect, useRef, useState } from "react";

const MenuItemImages = ({ product }) => {
  const carouselId = `carousel${product.id}`;
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    setContainerWidth(containerRef ? containerRef.current.offsetWidth : 0);
  }, [containerRef?.current?.offsetWidth]);

  return (
    <div
      ref={containerRef}
      id={carouselId}
      class="image-container carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {product.images.map((image, i) => (
          <div key={i} className={`carousel-item ${i == 0 ? "active" : ""}`}>
            <img
              src={image}
              className="d-block w-100"
              height={containerWidth}
              alt={`${product.title}`}
            />
          </div>
        ))}
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default MenuItemImages;
