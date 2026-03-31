import React, { useEffect, useState } from "react";
import {
  BooleanSelector,
  ProductSearchBar,
  RangeSelector,
  StringSelector,
} from "../Common";

interface Props {
  data: any;
  attributeQueryString?: string;
  setAttributeQueryString: (newSort: string) => void;
}

function SideBarFilter(props: Props) {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: number]: string[];
  }>({});

  const [priceQuery, setPriceQuery] = useState<string>("");
  const [attributeQuery, setAttributeQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Initial Hydration: Parse URL into local state (Runs once on mount)
  useEffect(() => {
    if (props.attributeQueryString) {
      const filters: { [key: number]: string[] } = {};

      let attrPart = "";
      let pricePart = "";
      let searchPart = "";

      const segments = props.attributeQueryString.split("&");

      attrPart = segments[0];
      segments.slice(1).forEach((segment) => {
        if (segment.startsWith("price=")) {
          pricePart = segment.replace("price=", "");
        } else if (segment.startsWith("search=")) {
          searchPart = segment.replace("search=", "");
        }
      });

      if (attrPart) {
        attrPart.split(";").forEach((segment) => {
          const match = segment.match(/(\d+)\[(.*)\]/);
          if (match) {
            const id = parseInt(match[1]);
            const values = match[2].split("~");
            filters[id] = values;
          }
        });
      }
      setSelectedFilters(filters);
      if (attrPart) setAttributeQuery(attrPart);
      if (pricePart) setPriceQuery("&price=" + pricePart);
      if (searchPart) setSearchQuery("&search=" + searchPart);
    }
  }, []);

  function handleSelectionChange(attributeId: number, values: string[]) {
    const nextFilters = {
      ...selectedFilters,
      [attributeId]: values,
    };

    const query = Object.entries(nextFilters)
      .filter(([_, values]) => values.length > 0)
      .map(([id, values]) => `${id}[${values.join("~")}]`)
      .join(";");

    props.setAttributeQueryString(query + priceQuery + searchQuery);
    setSelectedFilters(nextFilters);
    setAttributeQuery(query);
  }

  function handlePriceChange(values: string[]) {
    const newPriceQuery = "&price=" + values[0] + "~" + values[1];
    props.setAttributeQueryString(attributeQuery + newPriceQuery + searchQuery);
    setPriceQuery(newPriceQuery);
  }

  function handleSearchChange(searchTerm: string) {
    const newSearchQuery = "&search=" + searchTerm;
    props.setAttributeQueryString(attributeQuery + priceQuery + newSearchQuery);
    setSearchQuery(newSearchQuery);
  }

  function handleClearAll() {
    setSelectedFilters({});
    setPriceQuery("");
    setAttributeQuery("");
    setSearchQuery("");

    props.setAttributeQueryString("");
  }

  const priceAttribute = {
    min: 0,
    max: props.data.maxPrice,
    dataType: 3,
    attributeName: "Price",
  };

  const getPriceValues = () => {
    if (!priceQuery) return [];
    return priceQuery.replace("&price=", "").split("~");
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
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h4 className="m-0">Filter Products</h4>
        {(Object.values(selectedFilters).some((v) => v.length > 0) ||
          priceQuery ||
          attributeQuery ||
          searchQuery) && (
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={handleClearAll}
          >
            Clear All Filters
          </button>
        )}
      </div>
      <ul
        className="list-group"
        style={{
          paddingBottom: "60px",
        }}
      >
        <div className="input-group" style={{ width: "300px" }}>
          <ProductSearchBar
            onSearch={handleSearchChange}
            initialValue={searchQuery.replace("&search=", "")}
          />
        </div>
        <div key={0} className="mb-5">
          <RangeSelector
            attribute={priceAttribute}
            onSelectionChange={handlePriceChange}
            selectedFromUrl={getPriceValues()}
          />
        </div>
        {props.data.attributes.map((attribute: any) => {
          const currentSelections = selectedFilters[attribute.id] || [];
          switch (attribute.dataType) {
            case 1:
              return (
                <div key={attribute.id} className="mb-5">
                  <StringSelector
                    attribute={attribute}
                    onSelectionChange={(values: string[]) =>
                      handleSelectionChange(attribute.id, values)
                    }
                    selectedFromUrl={currentSelections}
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
                    selectedFromUrl={currentSelections}
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
                    selectedFromUrl={currentSelections}
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
