import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import InputLabel from "./InputLabel";
import { useState } from "react";

export default function CheckboxBuilder(attributes) {
  let value = "";
  if (Object.keys(attributes?.inputValue).length > 0) {
    value =
      attributes?.inputValue[attributes?.attributes?.props.name]?.answer ?? "";
  }
  let arrValue = [];

  value = value.toString()

  if (value !== "") {
    arrValue = value.split(",");
  }

  
  let drop = (attributes.attributes.contentvalue ?? []).map((e) => {
    let isChecked = false;
    if (arrValue.includes(e.props.innerHTML)) {
      isChecked = true;
    }
    return { label: e.props.innerHTML, checked: isChecked };
  });
  const [selectedValue, setSelectedValue] = useState([]);
  const handleOnChange = (val) => {
    let copy = JSON.parse(JSON.stringify(selectedValue));
    const index = copy.indexOf(val);
    if (index > -1) {
      copy.splice(index, 1);
    } else {
      copy.push(val);
    }
    attributes.handleOnChange(copy, attributes.attributes.props.name);
    setSelectedValue(copy);
  };
  return (
    <FormGroup>
      <InputLabel
        style={{ marginTop: "20px" }}
        id={attributes.attributes.props.name}
      >
        {attributes.label}
      </InputLabel>
      {drop?.length > 0
        ? drop.map((item, i) => (
            <FormControlLabel
              value={item.label}
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
              checked={item.checked}
              key={i}
              control={<Checkbox />}
              label={item.label}
            />
          ))
        : null}
    </FormGroup>
  );
}
