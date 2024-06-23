import { Grid } from "@mui/material";
import React from "react";
import Box from "../common/Box";
import DescriptionIcon from "@mui/icons-material/Description";
import Text from "../common/Text";
import CTable from "../common/CTable";
import Stack from "../common/Stack";
import Case from "case";
import AppStyle from "../utils/colors";

export default function AuditDetailTable({ columns, data }) {
  let datavalue = data;
  return (
    <>
      <Grid
        container
        sx={{ border: "2px solid rgb(51 122 183)", marginTop: "20px" }}
      >
        <Grid
          item
          lg={12}
          sx={{ background: "rgb(51 122 183)", height: "40px", width: "100%" }}
        >
          <Box sx={{ display: "flex" }}>
            <DescriptionIcon
              sx={{ color: "white", marginTop: "8px", marginLeft: "20px" }}
            />
            <Text
              sx={{
                marginTop: "8px",
                marginLeft: "10px",
                color: "rgb(255 255 255)",
              }}
            >
              Audit Details
            </Text>
          </Box>
        </Grid>
        <Stack
          sx={{
            "&>:nth-child(odd)": {
              background: AppStyle.muted,
            },
            width: "100%",
          }}
        >
          {Object.keys(datavalue).map((e) => {
            return (
              <Box  sx={{
                padding: "10px",
                display: 'flex',
                // justifyContent: 'center'

              }}>
                <Text
                  sx={{
                    // padding: "10px",
                    width: '17%',
                    textAlign: 'right'
                  }}
                >
                  {Case.sentence(e)}:
                </Text>
                <Text  sx={{
                    // padding: "10px",
                   fontWeight: 'bold',
                   paddingLeft: '15px'
                  }}>{data[e]}</Text>
              </Box>
            );
          })}
        </Stack>
      </Grid>
    </>
  );
}
