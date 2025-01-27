import React from "react";
import Box from "../common/Box";
import Stack from "../common/Stack";
import Text from "../common/Text";
import { dummy } from "./data";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "@mui/material/Tabs";

export default function TabsC({ onTabClick, data, activeFormIndex, activeFormId }) {
  const [value, setValue] = React.useState(activeFormId);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (data?.length == 0) {
    return <Text>No Data</Text>;
  }

  return (
    <>
      
      {data?.map((item, i) => {
                return (
                  <Tab
                    value={item?.form_id}
                    label={item?.form_name}
                    wrapped
                    key={i}
                    onClick={() => onTabClick(item.id, i)}
                  />
                );
              })}
    </>
  );
}
