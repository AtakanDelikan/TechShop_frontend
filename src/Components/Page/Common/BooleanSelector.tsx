import React, { useEffect, useState } from "react";

interface Props {
  attribute: any;
  onSelectionChange: (values: string[]) => void;
  selectedFromUrl?: string[];
}

function BooleanSelector(props: Props) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    if (props.selectedFromUrl && props.selectedFromUrl.length > 0) {
      setSelectedValue(props.selectedFromUrl[0]);
    } else {
      setSelectedValue("");
    }
  }, [props.selectedFromUrl]);

  const handleChange = (clickedValue: string) => {
    const nextValue = selectedValue === clickedValue ? "" : clickedValue;
    setSelectedValue(nextValue);
    props.onSelectionChange(nextValue ? [nextValue] : []);
  };

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
