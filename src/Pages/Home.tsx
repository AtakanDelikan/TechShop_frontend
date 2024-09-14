import React from "react";
import { LaptopList } from "../Components/Page/Laptops";

function Home() {
  return (
    <div>
      <div className="container p-2">
        <LaptopList />
      </div>
    </div>
  );
}

export default Home;
