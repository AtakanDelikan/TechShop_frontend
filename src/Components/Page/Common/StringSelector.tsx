import React, { useEffect, useState } from "react";

interface Props {
  attribute: any;
  onSelectionChange: (values: string[]) => void;
  selectedFromUrl?: string[];
}

function StringSelector(props: Props) {
  const uniqueValues = props.attribute.uniqueValues;

  // State to manage selected values
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Sync state when URL changes
  useEffect(() => {
    if (props.selectedFromUrl) {
      setSelectedValues(props.selectedFromUrl);
    }
  }, [props.selectedFromUrl]);

  // Handle checkbox change
  const handleChange = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    setSelectedValues(newValues);
    props.onSelectionChange(newValues); // Call directly to avoid extra useEffect lag
  };

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
