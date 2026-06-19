import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Text from "../common/Text";
import LinearProgress from "@mui/material/LinearProgress";
import CTable from "../common/CTable";
import ViewListIcon from "@mui/icons-material/ViewList";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "../common/Button";
import DescriptionIcon from "@mui/icons-material/Description";
import ResultsTable from "./ResultsTable";
import AuditDetailTable from "./AuditDetailTable";
import OverallExperience from "./OverallExperience";
import Attachments from "./Attachments";
import Stack from "../common/Stack";
import AppStyle, { getColorByScore } from "../utils/colors";

export default function Result(props) {

  const {categoryResult, category_percentages, overall_percentage, auditDetails, images} = props;
  const overallPercentageValue = Number(overall_percentage ?? 0);
  const overallPercentageDisplay = overallPercentageValue.toFixed(2);

  let auditData = {...auditDetails,overall_experience:overallPercentageDisplay};
  const columns = [
    {
      
      field: "store_name",
      headerName: "Store Name",
      
    },
    {
      field: "store_code",
      headerName: "Store Code",
    },
    {
      field: "address",
      headerName: "Address",
    },
    {
      field: "audit_date",
      headerName: "Audit Date",
    },
  ];
  const data = [
    {
      no: " 1",
      question: " what about science?",
      answer: "about to science",
      marks: "300",
      maxmarks: "500",
    },
    {
      no: " 2",
      question: " what about maths?",
      answer: "details about maths ",
      marks: "200",
      maxmarks: "500",
    },
  ];

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
  //     color = "success";
  //   }

  //   return color;
  // }

  const columns1 = [

    // {
    //   field: "no",
    //   headerName: "Sr. No",
    //   renderCell: (v,d,i)=>{
    //     console.log("inside render",v,d,i)
    //   },
    //   valueGetter: (v, d,i) => {
    //     console.log("inside getter",v,d,i)
    //     return (
    //       <>
    //        <Text>1</Text>
    //       </>
    //     );
    //   },
    // },    
    {
      field: "category_name",
      headerName: "Section",
    },

    {
      field: "category_percentage",
      headerName: "Score",

      valueGetter: (v, d) => {
        return (
          <>
            {
              <>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{width: '40px', textAlign: 'start', }} variant="body2">
                    {/* 85% */}
                    {v}%
                  </Typography>
                  <Box sx={{color: getColorByScore(v)}}>
                  <LinearProgress
                    sx={{
                      m: 1,
                      width: 320,
                      height: 16,
                      borderRadius: 4,
                      marginTop: "3px",
                      background:AppStyle.muted
                    }}
                    variant="determinate"
                    value={v}
                    color={"inherit"}
                  ></LinearProgress>
                  </Box>
                </Box>
              </>
            }
          </>
        );
      },
    },
  ];
  
  // const data1 = [
  //   {
  //     no: " 1",
  //     section: " Parking Area",
  //     score: "75%",
  //   },

  //   {
  //     no: " 2",
  //     section: " Entrance",
  //     score: "100%",
  //   },
  //   {
  //     no: " 3",
  //     section: " Store Ambience",
  //     score: "100%",
  //   },
  //   {
  //     no: " 4",
  //     section: " Staff Knowledge & Service",
  //     score: "64%",
  //   },
  //   {
  //     no: " 5",
  //     section: " Brand Advocacy",
  //     score: "57%",
  //   },
  //   {
  //     no: " 6",
  //     section: " Product Presentation",
  //     score: "57%",
  //   },
  // ];

  // const summury = `The store ambiance was well-maintained. The signboard was
  // damage-free, well-maintained, and clearly visible from the outside.
  // The entrance was clean and dirt-free. The interior was well
  // illuminated and the temperature was also comfortable. There
  // advertising and promotion of the brand were very good. The display
  // area and counter area were well-organized and clutter-free. The
  // pricing labels were present with all the products. Everything in the
  // store was in its perfect place.`;

 

  return (
    <>
      <Container>
        <Box
          sx={{ display: "flex", borderBottom: "2px solid rgb(238 238 238)" }}
        >
          <DescriptionIcon
            sx={{ color: "black", marginTop: "10px", fontSize: "30px" }}
          />

          <Text sx={{ marginTop: "10px", fontSize: "24px" }}>Audit Report</Text>
        </Box>

        <AuditDetailTable data={auditData} columns={columns} />



        {/* {category_percentages.map((item) => (
         
        ))} */}
        <OverallExperience overall_percentage={overallPercentageValue} />


        {/* //OverallExperience section */}
       

        <Grid
          container
          sx={{ border: "2px solid rgb(225 225 225)", marginTop: "20px" }}
        >
          <Grid
            item
            lg={12}
            sx={{ background: "rgb(241, 241, 241)", height: "40px",width:"100%" }}
          >
            <Text sx={{ marginTop: "8px", marginLeft: "20px" }}>
              Audit Summary
            </Text>
          </Grid>
          <CTable columns={columns1} data={category_percentages} />
        </Grid>

        <Grid container sx={{ marginTop: "20px" }}>
          <Grid item lg={12} xs={12} p={2}>
            <Box
              sx={{
                display: "flex",
                borderBottom: "2px solid rgb(238 238 238)",
              }}
            >
              <ViewListIcon />
              <Typography
                sx={{ fontSize: "19px", marginLeft: "10px", fontWeight: "600" }}
              >
                Questionnaire
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {categoryResult.map((item) => (
          <ResultsTable item={item} />
        ))}

        <Grid
          container
          sx={{ border: "2px solid rgb(225 225 225)", marginTop: "20px" }}
        >
          <Grid item lg={12}>
            <Box sx={{ display: "flex", background: "rgb(245 245 245)" }}>
              <AttachFileIcon sx={{ marginLeft: "20px", padding: "10px" }} />
              <Typography
                sx={{ fontWeight: "600", fontSize: "24px", padding: "6px" }}
              >
                Attachment
              </Typography>
            </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
          {
            images && images.length> 0 ?  (
              images.map((item)=>{
                return item.value !== undefined && item.value !==  "" ?  <Attachments name={item.label} src={item.value} /> : null
              })
            ): "No Attachments"
          }
          </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
