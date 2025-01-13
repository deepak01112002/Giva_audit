import React from "react";
import InputLabel from "./InputLabel";
import Input from "./Input";
import Box from "./Box";
import MDatePicker from "./DatePicker";
import MDropzoneDialog from "../components/internalAdmin/MDropzoneDialog";
import Select from "./Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";

const InputBuilder = (attributes) => {
  let value = "";
  let imageValue = "";

  if (Object.keys(attributes?.inputValue).length > 0) {
    if (attributes?.attributes?.props?.name in attributes?.inputValue) {
      value =
        attributes?.inputValue[attributes?.attributes?.props?.name]["answer"] ??
        "";
      imageValue =
        attributes?.inputValue[attributes?.attributes?.props?.name][
          "imageData"
        ] ?? "";
    }
  }

  if (attributes.attributes.props.type === "date") {
    if (Object.keys(attributes?.inputValue).length > 0) {
      if (attributes?.attributes?.props?.name in attributes?.inputValue) {
        value = new Date(
          attributes?.inputValue[attributes.attributes.props.name]["answer"] ??
            ""
        );
      }
    }
    try {
      value.toISOString();
    } catch (e) {
      value = new Date(Date.now());
    }
  }

  let tag;

  switch (attributes.attributes.props.type) {
    case "date":
      tag = (
        <Box sx={{ marginTop: "10px" }}>
          <MDatePicker
            required={attributes.attributes.props.required}
            value={dayjs(value)}
            onChange={(e) => {
              attributes.handleOnChange(
                e.toISOString().split("T")[0],
                attributes.attributes.props.name
              );
            }}
          />
        </Box>
      );
      break;

    case "text":
      if (attributes.label === "Store Name") {
        let drop = (attributes?.attributes?.contentvalue ?? []).map(
          (e) => e.props.innerHTML
        );
        let extraData = (attributes?.attributes?.contentvalue ?? []).map(
          (e) => e.extraData
        );
        let onlyLabel = [];
        let storeCode = (attributes?.attributes?.contentvalue ?? []).map(
          (e) => {
            onlyLabel.push(
              e?.extraData?.store_name + " - " + e?.extraData?.store_code
            );
            return e?.extraData?.store_name;
          }
        );

        const defaultProps = {
          options: storeCode,
          getOptionLabel: (option) => {
            let res = attributes?.attributes?.contentvalue.find(
              (e) => e?.extraData?.store_name === option
            );
            return (
              res?.extraData?.store_name + " - " + res?.extraData?.store_code
            );
          },
        };

        tag = (
          <Autocomplete
            {...defaultProps}
            id="auto-select"
            autoSelect
            value={value}
            renderInput={(params) => (
              <TextField {...params} label={attributes.label} variant="standard" />
            )}
            onChange={(event, newValue) => {
              attributes.handleOnChange(
                newValue,
                attributes.attributes.props.name,
                extraData,
                event
              );
            }}
          />
        );
      } else {
        tag = (
          <Input
            label={attributes.label}
            value={value}
            required={attributes.attributes.props.required}
            type={attributes.attributes.props.link ? "url" : "text"}
            onChange={(e) =>
              attributes.handleOnChange(
                e.target.value,
                attributes.attributes.props.name
              )
            }
            disabled={attributes?.auto_fill ?? false}
            sx={{ marginTop: "10px", width: "100%" }}
          />
        );
      }
      break;

    case "file":
      tag = (
        <Box sx={{ marginTop: "10px" }}>
          <MDropzoneDialog
            imageValue={imageValue}
            value={value}
            handleOnChange={(val) => {
              try {
                attributes.handleOnChange(
                  val.target.files,
                  attributes.attributes.props.name,
                  "image"
                );
              } catch (e) {}
            }}
          />
        </Box>
      );
      break;

    default:
      tag = (
        <Input
          label={attributes.label}
          value={value}
          required={attributes.attributes.props.required}
          type={attributes.attributes.props.link ? "url" : "text"}
          onChange={(e) =>
            attributes.handleOnChange(
              e.target.value,
              attributes.attributes.props.name
            )
          }
          disabled={attributes?.auto_fill ?? false}
          sx={{ marginTop: "10px", width: "100%" }}
        />
      );
  }

  return (
    <>
      <Box sx={{ marginTop: "20px" }}>
        <InputLabel id={attributes.attributes.props.name}>
          {attributes.label}
        </InputLabel>
        {tag}
      </Box>
    </>
  );
};

export default InputBuilder;
