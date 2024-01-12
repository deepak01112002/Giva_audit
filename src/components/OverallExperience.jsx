import { Grid, LinearProgress } from "@mui/material";
import React from "react";
import Box from "../common/Box";
import Text from "../common/Text";
import AppStyle, { getColorByScore } from "../utils/colors";

export default function OverallExperience({ overall_percentage }) {
  // function color(percent) {
  //   let color = "success";

  //   if (percent > 0 && percent <= 20) {
  //     color = "alert";
  //   } else if (percent > 20 && percent <= 40) {
  //     color = "warning";
  //   } else if (percent > 40 && percent <= 60) {
  //     color = "info";
  //   } else if (percent > 60 && percent <= 80) {
  //     color = "primary";
  //   } else if (percent > 80 && percent <= 100) {
  //     color = "info";
  //   }

  //   return color;
  // }

  const data = [
    {
      label: "Excellent",
      description: "90% and above",
      score: "100",
    },
    {
      label: "Good",
      description: "85% - 89%",
      score: "86",
    },
    {
      label: "Average",
      description: "75% - 84%",
      score: "80",
    },
    {
      label: "Poor",
      description: "66% - 74%",
      score: "70",
    },
    {
      label: "Bad",
      description: "0% - 65%",
      score: "50",
    },
  ];

  return (
    <>
      <Grid
        container
        sx={{ border: "2px solid rgb(225 225 225)", marginTop: "20px" }}
      >
        <Grid
          item
          lg={12}
          sx={{
            background: "rgb(241, 241, 241)",
            height: "40px",
            width: "100%",
          }}
        >
          <Text sx={{ marginTop: "8px", marginLeft: "20px" }}>
            Overall Experience
          </Text>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Box
            sx={{
              display: "flex",
              color: getColorByScore(overall_percentage),
              alignItems: "center",
              height: "100%",
            }}
          >
            <LinearProgress
              sx={{
                m: 1,
                width: 500,
                height: 26,
                borderRadius: 4,
                marginTop: "20px",
                background: AppStyle.muted,
              }}
              variant="determinate"
              value={overall_percentage}
              color={"inherit"}
            />
            <Text
              sx={{ marginTop: "15px", fontWeight: "600" }}
              variant="body2"
              color="text.secondary"
            >
              {overall_percentage}%
            </Text>
          </Box>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {data.map((item) => {
              return (
                <Box
                  sx={{
                    background: getColorByScore(item.score),
                    padding: "10px",
                    border: "1px solid rgb(228 223 206)",
                    display: "flex",
                    // justifyContent: "center",
                  }}
                  item
                  lg={4}
                >
                  <Text sx={{ fontWeight: "600",width: '30%', textAlign: "right" }}>
                    {/* Excellant{" "} */} {item.label}
                  </Text>

                  <Text sx={{ marginLeft: "15px", fontWeight: "300" }}>
                    {/* Excellant{" "} */} {item.description}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
