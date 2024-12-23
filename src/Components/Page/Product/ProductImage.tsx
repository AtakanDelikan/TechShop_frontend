import React, { useState } from "react";
import { toastNotify } from "../../../Helper";

interface Props {
  images: string[];
  setImages: (value: React.SetStateAction<string[]>) => void;
}

function ProductImage(props: Props) {
  // Handle drag start
  const handleDragStart = (index: any) => (event: any) => {
    event.dataTransfer.setData("dragIndex", index);
  };

  // Handle drop
  const handleDrop = (dropIndex: any) => (event: any) => {
    const dragIndex = parseInt(event.dataTransfer.getData("dragIndex"), 10);

    if (dragIndex !== dropIndex) {
      props.setImages((prevImages) => {
        const newImages = [...prevImages];
        const temp = newImages[dropIndex];
        newImages[dropIndex] = newImages[dragIndex];
        newImages[dragIndex] = temp;
        return newImages;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        toastNotify("File Must be less then 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        toastNotify("File Must be in jpeg, jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const newImgUrl = e.target?.result as string;
        props.setImages((prevImages) => [...prevImages, newImgUrl]);
      };
    }
  };

  return (
    <div className="ms-3">
      <input
        type="file"
        onChange={handleFileChange}
        id="fileInput"
        className="d-none"
      />
      <label htmlFor="fileInput" className="btn btn-primary mt-5 mb-3">
        Add Picture
      </label>
      <div className="row">
        {/* First Image - Larger and spans entire row */}
        {props.images[0] && (
          <div
            key={0}
            className="col-12 mb-3 p-1"
            draggable
            onDragStart={(event) => handleDragStart(0)(event)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(event) => handleDrop(0)(event)}
          >
            <div className="p-3 border" style={{ aspectRatio: "1.4 / 1" }}>
              <img
                src={props.images[0]}
                alt={`Image 0`}
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
        {props.images.slice(1).map((image, index) => (
          <div
            // key={image.id}
            key={index + 1}
            className="col-4 m-0 p-1"
            draggable
            onDragStart={(event) => handleDragStart(index + 1)(event)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(event) => handleDrop(index + 1)(event)}
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

export default ProductImage;
