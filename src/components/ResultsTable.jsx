import { Grid } from "@mui/material";
import Case from "case";
import React from "react";
import Box from "../common/Box";
import CTable from "../common/CTable";
import Text from "../common/Text";
import { imgBaseUrl } from "../helpers/constants";
import { getColorByScore } from "../utils/colors";

export default function ResultsTable({ item }) {
  const urlify = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part) => {
      if (part.match(urlRegex)) {
        return (
          <a target="_blank" href={part}>
            {part}
          </a>
        );
      }
      return part;
    });
  };

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  const columns = [
    {
      field: "question",
      headerName: "Question",
      // valueGetter: (v) => {
      //   return (
      //       <Text sx={{alignSelf: 'center'}}>{v}</Text>
      //   );
      // },
    },
    {
      field: "answer",
      headerName: "Answer",
      valueGetter: (v, d, i) => {
        if (isImage(v)) {
          return (
            <>
              <img
                src={imgBaseUrl + v}
                style={{ width: "150px", height: "100px" }}
              />
            </>
          );
        }
        return (
          <>
            <div>{urlify(v)}</div>
          </>
        );
      },
    },
    {
      field: "marks",
      headerName: "Marks",
    },
    {
      field: "max_marks",
      headerName: "Max Marks",
    },
  ];

  return (
    <Grid
      container
      sx={{
        border: `1px solid ${getColorByScore(
          (item.marks_scored / item.category_marks) * 100
        )}`,
        marginTop: "20px",
      }}
    >
      <Grid
        item
        lg={12}
        sx={{
          background: getColorByScore(
            (item.marks_scored / item.category_marks) * 100
          ),
          height: "40px",
          width: "100%",
        }}
      >
        <Text
          sx={{
            marginTop: "8px",
            marginLeft: "20px",
            color: "black",
            fontWeight: "550",
          }}
        >
          {Case.sentence(item.category)}
        </Text>
      </Grid>
      <CTable columns={columns} data={item.questionnarie} />
      <Box
        sx={{
          width: "100%",
          backgroundColor: getColorByScore(
            (item.marks_scored / item.category_marks) * 100
          ),
          borderRadius: "5px",
          border: "2px solid #f9f9f9",
        }}
      >
        {item.category_marks ? (
          <Text
            sx={{ fontWeight: "500", fontSize: "15px", p: 1.5, color: "black" }}
          >
            <span style={{ fontWeight: "700" }}>Total Marks</span>
            {item.marks_scored} out of {item.category_marks}
          </Text>
        ) : null}

        {/* <Text
        sx={{ fontWeight: "500", fontSize: "15px", p: 1.5, color: "black" }}
      >
        <span style={{ fontWeight: "700" }}>Section Summury :</span>
       {item.summury}
      </Text> */}
      </Box>
    </Grid>
  );
}
