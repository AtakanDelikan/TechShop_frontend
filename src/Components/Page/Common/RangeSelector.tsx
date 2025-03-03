import { Box, Slider } from "@mui/material";
import React, { useState } from "react";

interface Props {
  attribute: any;
  onSelectionChange: (values: string[]) => void;
}

function RangeSelector(props: Props) {
  const [values, setValues] = useState<number[]>([
    props.attribute.min,
    props.attribute.max,
  ]);

  const step = props.attribute?.dataType === 3 ? 0.1 : 1;

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValues([Math.min(newValue[0], values[1] - step), values[1]]);
    } else {
      setValues([values[0], Math.max(newValue[1], values[0] + step)]);
    }
  };

  // useEffect(() => {
  //   // props.onSelectionChange(values);
  //   props.onSelectionChange(values.map(String));
  // }, [values]);

  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    if (
      values[0] === props.attribute.min &&
      values[1] === props.attribute.max
    ) {
      props.onSelectionChange([]);
    } else {
      props.onSelectionChange(values.map(String));
    }
  };

  return (
    <Box sx={{ width: 290 }}>
      <h5>{props.attribute.attributeName}</h5>
      <Slider
        value={values}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        step={step}
        min={props.attribute.min}
        max={props.attribute.max}
        disableSwap
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ textAlign: "left" }}>{values[0]}</div>
        <div style={{ textAlign: "right" }}>{values[1]}</div>
      </Box>
    </Box>
  );
}

export default RangeSelector;
