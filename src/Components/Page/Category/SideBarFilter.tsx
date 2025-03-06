import React, { useState } from "react";
import { BooleanSelector, RangeSelector, StringSelector } from "../Common";

interface Props {
  data: any;
  setAttributeQueryString: React.Dispatch<React.SetStateAction<string>>;
}

function SideBarFilter(props: Props) {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: number]: string[];
  }>({});

  const [priceQuery, setPriceQuery] = useState<string>("");

  const attributeQueryString =
    Object.entries(selectedFilters)
      .filter(([_, values]) => values.length > 0) // Exclude entries with empty values
      .map(([attributeId, values]) => `${attributeId}[${values.join("﹐")}]`)
      .join(";") + priceQuery;

  props.setAttributeQueryString(attributeQueryString);

  function handleSelectionChange(attributeId: number, values: string[]) {
    setSelectedFilters((prev) => ({ ...prev, [attributeId]: values }));
  }

  function handlePriceChange(values: string[]) {
    setPriceQuery("&price=" + values[0] + "﹐" + values[1]);
  }

  const priceAttribute = {
    min: 0,
    max: props.data.maxPrice,
    dataType: 3,
    attributeName: "Price",
  };

  return (
    <div
      className="bg-light p-3 overflow-auto flex-shrink-0"
      style={{
        width: "350px",
        position: "sticky",
        top: 0,
        bottom: 0,
        height: "100vh",
        overflowY: "auto",
        borderRight: "1px solid #ddd",
        paddingBottom: "60px",
      }}
    >
      <h4 className="mb-5">Filter Products</h4>
      <ul
        className="list-group"
        style={{
          paddingBottom: "60px",
        }}
      >
        <div key={0} className="mb-5">
          <RangeSelector
            attribute={priceAttribute}
            onSelectionChange={handlePriceChange}
          />
        </div>
        {props.data.attributes.map((attribute: any) => {
          switch (attribute.dataType) {
            case 1:
              return (
                <div key={attribute.id} className="mb-5">
                  <StringSelector
                    attribute={attribute}
                    onSelectionChange={(values: string[]) =>
                      handleSelectionChange(attribute.id, values)
                    }
                  />
                </div>
              );

            case 2:
            case 3:
              return (
                <div key={attribute.id} className="mb-5">
                  <RangeSelector
                    attribute={attribute}
                    onSelectionChange={(values: string[]) =>
                      handleSelectionChange(attribute.id, values)
                    }
                  />
                </div>
              );
            case 4:
              return (
                <div key={attribute.id} className="mb-5">
                  <BooleanSelector
                    attribute={attribute}
                    onSelectionChange={(values: string[]) =>
                      handleSelectionChange(attribute.id, values)
                    }
                  />
                </div>
              );
            default:
              return null; // Return null if no valid dataType matches
          }
        })}
      </ul>
    </div>
  );
}

export default SideBarFilter;
