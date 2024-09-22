import React from "react";
import { useState, useEffect } from "react";
import { laptopModel } from "../../../Interfaces";
import LaptopCard from "./LaptopCard";
import { useGetLaptopsQuery } from "../../../Apis/LaptopApi";
import { useDispatch } from "react-redux";
import { setLaptop } from "../../../Storage/Redux/laptopSlice";
import { MainLoader } from "../Common";

function LaptopList() {
  // const [laptops, setLaptops] = useState<laptopModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetLaptopsQuery(null);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setLaptop(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((laptop: laptopModel, index: number) => (
          <LaptopCard laptop={laptop} key={index} />
        ))}
    </div>
  );
}

export default LaptopList;
