import React, { useEffect, useState } from "react";

interface Props {
  attribute: any;
  onSelectionChange: (values: string[]) => void;
}

function StringSelector(props: Props) {
  const uniqueValues = props.attribute.uniqueValues;

  // State to manage selected values
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Handle checkbox change
  const handleChange = (value: string) => {
    setSelectedValues(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // Remove if already selected
          : [...prev, value] // Add if not selected
    );
  };

  useEffect(() => {
    props.onSelectionChange(selectedValues);
  }, [selectedValues]);

  return (
    <div>
      <h5>{props.attribute.attributeName}</h5>
      {uniqueValues.length === 0 ? (
        <p>No options available</p>
      ) : (
        <div>
          {uniqueValues.map((value: any) => (
            <div key={value}>
              <label>
                <input
                  className="m-2"
                  type="checkbox"
                  value={value}
                  checked={selectedValues.includes(value)}
                  onChange={() => handleChange(value)}
                />
                {value}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StringSelector;
