import React from "react";
import Select from "./Select";
import InputLabel from "./InputLabel";
import { Box } from "@mui/system";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
//   RadioGroup,
} from "@mui/material";
import RadioGroup from "./RadioGroup";


export default function RadioBuilder(attributes) {
  //   let drop = (attributes.attributes.contentvalue ?? []).map(
  //     (e) => e.props.innerHTML
  //   );
  //   return drop
  return (
    <>
      <FormControl>
      <InputLabel id={attributes.attributes.props.name}>
        {attributes.label}
      </InputLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="yes" control={<Radio />} label="yes" />
          <FormControlLabel value="no" control={<Radio />} label="no" />
        </RadioGroup>
      </FormControl>

      {/* <Select
        id={attributes.attributes.props.name}
        placeholder={attributes.label}
        required={attributes.attributes.props.required}
        onChange={(e) =>
          attributes.handleOnChange(e, attributes.attributes.props.name)
        }
        value={
          attributes.inputValue[attributes.attributes.props.name]["answer"]
        }
        data={drop}
        sx={{ marginTop: "10px" }}
      /> */}
    </>
  );
}
