import React, { useState } from "react";

interface Props {
  images: string[];
}

function ProductImageDisplay(props: Props) {
  const [mainImage, setMainImage] = useState<string>(props.images[0]);

  const handleImageClick = (Imageindex: any) => {
    if (Imageindex < props.images.length) {
      setMainImage(props.images[Imageindex]);
    }
  };

  return (
    <div className="ms-3">
      <div className="row">
        {/* First Image - Larger and spans entire row */}
        {props.images[0] && (
          <div key={0} className="col-12 mb-3 p-1 position-relative">
            <div className="p-3 border" style={{ aspectRatio: "1.4 / 1" }}>
              <img
                src={mainImage}
                alt={`Main image`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        )}
        {/* Remaining Images */}
        {props.images.map((image, index) => (
          <div
            // key={image.id}
            key={index}
            className="col-4 m-0 p-1 position-relative"
            onClick={() => handleImageClick(index)}
          >
            <div className="p-2 border" style={{ aspectRatio: "1.4 / 1" }}>
              <img
                src={image}
                alt={`Image ${index}`}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImageDisplay;
