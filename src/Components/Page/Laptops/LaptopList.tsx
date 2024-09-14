import React from "react";
import { useState, useEffect } from "react";
import { laptopModel } from "../../../Interfaces";
import LaptopCard from "./LaptopCard";

function LaptopList() {
  const [laptops, setLaptops] = useState<laptopModel[]>([]);

  useEffect(() => {
    fetch("https://localhost:7260/api/Laptop")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLaptops(data.result);
      });
  }, []);

  return (
    <div className="container row">
      {laptops.length > 0 &&
        laptops.map((laptop, index) => (
          <LaptopCard laptop={laptop} key={index} />
        ))}
    </div>
  );
}

export default LaptopList;
