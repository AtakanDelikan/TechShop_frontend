import React, { useEffect, useState } from "react";

interface Props {
  attribute: any;
  onSelectionChange: (values: string[]) => void;
}

function BooleanSelector(props: Props) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedValue(
      (prev) => (prev === value ? (prev = "") : (prev = value)) // Add if not selected
    );
  };

  useEffect(() => {
    props.onSelectionChange(selectedValue ? [selectedValue] : []);
  }, [selectedValue]);

  return (
    <div>
      <h5>{props.attribute.attributeName}</h5>
      <div>
        <label>
          <input
            className="m-2"
            type="checkbox"
            value={"true"}
            checked={selectedValue === "true"}
            onChange={() => handleChange("true")}
          />
          Yes
        </label>
      </div>
      <div>
        <label>
          <input
            className="m-2"
            type="checkbox"
            value={"false"}
            checked={selectedValue === "false"}
            onChange={() => handleChange("false")}
          />
          No
        </label>
      </div>
    </div>
  );
}

export default BooleanSelector;
