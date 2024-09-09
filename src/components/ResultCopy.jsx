import React from "react";
import {
  Page,
  View,
  Document,
  StyleSheet,
  Text,
  Image,
  Font,
} from "@react-pdf/renderer";
import { getColorByScore } from "../utils/colors";
let data  = JSON.parse(localStorage.getItem("user"));
let client_code = data?.data?.client_code ? data?.data?.client_code : 'sleep' ;



const audit_details = [
  {
    key: "Client",
    value: "Bummidi bangaru jwellers",
  },
  {
    key: "Store code",
    value: "600006",
  },
  {
    key: "Store",
    value: "Flagship store - Anna salai",
  },
  {
    key: "store type",
    value: "",
  },
  {
    key: "Audit type",
    value: "Walk in",
  },
  {
    key: "Address",
    value:
      "ANNA SALAI Rani Seethai Hall Parallel to Gemini Flyover 603,Anna Salai  Chennai, Tamilnadu - 600006, Chennai",
  },
  {
    key: "Audit date",
    value: "7th May 2022",
  },
  {
    key: "Overall experience",
    value: "82%",
  },
];

const data3 = [
  {
    section: "Parking Area ",
    Score: 25,
  },
  {
    section: "Entrance ",
    Score: 45,
  },
  {
    section: "Store Ambiance",
    Score: 55,
  },
  {
    section: "Staff Knowledge",
    Score: 65,
  },
  {
    section: "Brand Advocacy",
    Score: 75,
  },
  {
    section: "Product Presentation",
    Score: 25,
  },
  {
    section: "Collection Presentation",
    Score: 15,
  },
  {
    section: "Closing",
    Score: 95,
  },
  {
    section: "Handling Customer Enquiries",
    Score: 25,
  },
  {
    section: "Consumer Experience",
    Score: 25,
  },
];

const data4 = [
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

const objectMap = (data) => {
  let res = [];
  let arr = Object.keys(data);
  // for (let a in data) {

  // }
  arr.map((a, i) => {
    res.push(
      <tr>
        <td
          style={{
            textAlign: "end",
            background: i % 2 === 0 ? "#f2f2f2" : "white",
            width: '200px'
          }}
        >
          {a}:
        </td>
        <td
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            background: i % 2 === 0 ? "#f2f2f2" : "white",
          }}
        >
          {data[a]}
        </td>
      </tr>
    );
  });
  return res;
};

const isImage = (url) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
function isURL(str) {
  // Regular expression pattern for URL validation
  // var pattern = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:www\.)?(?:[^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  var pattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  return pattern.test(str);
}

const ResultCopy = ({ data, mWidth }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <div style={{display:"flex", justifyContent:'space-between' , marginRight:'6rem'}}> 
        <div style={styles.pdf_head}>
          <img
            src="/fileIconBlack.png"
            style={{ height: "24px", width: "24px", marginTop: "6px" }}
          />
          <span
            style={{ fontSize: "25px", fontWeight: "bold", marginLeft: "5px" }}
          >
            Audit Report
          </span>
          
        </div>
        <div>
        {client_code === 'sleep' ? (
    <img
        src="/sleep_logo.png"
        style={styles.logo}
        alt="Sleep Logo"
    />
) : (
   null
)}


        </div>
        </div>
      
        <div style={styles.table_div}>
          <div style={{ width: mWidth, border: "1px solid #427ef5" }}>
            <div style={styles.heading}>
              <p
                style={{
                  color: "white",
                  fontSize: "18px",
                  background: "#427ef5",
                  padding: "7px",
                  alignItems: "center",
                }}
              >
                <img
                  src="/fileIconWhite.png"
                  style={{ height: "24px", width: "24px", marginRight: "5px" }}
                />
                Audit Details
              </p>
            </div>
            <table class="table">
              {/* <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer </th>
                  <th>Marks</th>
                  <th>Max Marks</th>
                </tr>
              </thead> */}
              <tbody>
                {data.audit_details && data.audit_details.length > 0
                  ? data?.audit_details.map((item, i) => (
                      <tr style={{}}>
                        <td
                          style={{
                            textAlign: "end",
                            background: i % 2 === 0 ? "#f2f2f2" : "white",
                            width: "200px"
                          }}
                        >
                          {item?.key}:
                        </td>
                        <td
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            background: i % 2 === 0 ? "#f2f2f2" : "white",
                          }}
                        >
                          {item?.value}
                        </td>
                      </tr>
                    ))
                  : data.audit_details &&
                    Object.keys(data.audit_details).length > 0
                  ? objectMap(data.audit_details)
                  : null}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.table_div}>
          <div
            style={{
              border: "2px solid rgb(193 192 190)",
              // display: "flex",
              width: mWidth,
            }}
          >
            <div
              style={{
                ...styles.heading,
                width: "100%",
                // paddingBottom: "15px",
                display: "block",
              }}
            >
              <p
                style={{
                  color: "black",
                  fontSize: "18px",
                  padding: "7px",
                  background: "#e6e7e8",
                  paddingBottom: "15px",
                }}
              >
                Overall Experience
              </p>
              <div style={{ display: "flex", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    width: "60%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      height: "30px",
                      borderRadius: "20px",
                    }}
                    class="progress"
                  >
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${data.overall_percentage}%`,
                        background: getColorByScore(data.overall_percentage),
                      }}
                    >
                      <span
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          marginTop: "1px",
                        }}
                        class=""
                      >{`${Math.round(data.overall_percentage) ?? 0}%`}</span>
                    </div>
                  </div>
                  <span style={{ fontWeight: "bold" }}>Average</span>
                </div>
                <div style={{ width: "40%", display: "flex" }}>
                  <table class="table">
                    <tbody>
                      {data4.map((item, i) => (
                        <tr
                          style={{
                            background: getColorByScore(item.score),
                          }}
                        >
                          <td>{item.label}</td>
                          <td>{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.table_div}>
          <div
            style={{
              border: "2px solid rgb(193 192 190)",
              // display: "flex",
              width: mWidth,
            }}
          >
            <div style={{ background: "#e6e7e8", padding: "5px" }}>
              <p>Audit Summary</p>
            </div>
            <table class="table ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Section</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {data.category_percentages &&
                data.category_percentages.length > 0
                  ? data.category_percentages.map((item, i) => (
                      <tr>
                        <td style={{ width: "10%" }}>{i + 1}</td>
                        <td style={{ width: "30%" }}>{item.category_name}</td>
                        <td style={{ display: "flex", alignItems: "center" }}>
                          <p
                            style={{
                              padding: 0,
                              margin: 0,
                              marginRight: "5px",
                            }}
                          >
                            {Math.round(item.category_percentage)}%
                          </p>
                          <div
                            style={{
                              width: "60%",
                              // height: "30px",
                              borderRadius: "20px",
                              // marginTop: '2px'
                            }}
                            class="progress"
                          >
                            <div
                              class="progress-bar"
                              role="progressbar"
                              aria-valuenow="70"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{
                                width: `${item.category_percentage}%`,
                                background: getColorByScore(
                                  item.category_percentage
                                ),
                              }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        <h2 style={styles.pdf_head}>Questionnaire</h2>

        {/* <table style={styles.table1}>
                  <th>Audit Details:</th>
                </table> */}

        {data?.categories_result?.map((item, i) => (
          <>
            <div style={styles.table_div}>
              <div
                style={{
                  // display: "flex",
                  width: mWidth,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: getColorByScore(
                    (item.marks_scored / item.category_marks) * 100
                  ),
                }}
              >
                {/* <div style={{ display: "flex" }}> */}
                <div style={styles.table_div1}></div>
                <div
                  style={{
                    background: getColorByScore(
                      (item.marks_scored / item.category_marks) * 100,
                      "background"
                    ),
                    textTransform: "capitalize",
                    padding: "5px",
                    fontWeight: "bold",
                    paddingLeft: "9px",
                    paddingTop: "10px",
                    color: getColorByScore(
                      (item.marks_scored / item.category_marks) * 100
                    ),
                  }}
                >
                  <p>{item.category ?? "-"}</p>
                </div>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Answer </th>
                      <th>Marks</th>
                      <th>Max Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.questionnarie.map((item2, j) => {
                      return (
                        <tr key={i}>
                          <td
                            style={{
                              background: j % 2 === 0 ? "#f2f2f2" : "white",
                            }}
                          >
                           <Text> {item2?.question ?? "-"}</Text>
                          </td>
                          <td
                            style={{
                              background: j % 2 === 0 ? "#f2f2f2" : "white",
                            }}
                          >
                            {isImage(item2?.answer??'')?<img height="175px" style={{objectFit: 'contain'}} src={item2?.answer} /> : isURL(item2?.answer??'')?<a href={item2?.answer}>{item2?.answer}</a>: item2?.answer??'-'}
                          </td>
                          <td
                            style={{
                              background: j % 2 === 0 ? "#f2f2f2" : "white",
                            }}
                          >
                            {item2?.marks ?? "-"}
                          </td>
                          <td
                            style={{
                              background: j % 2 === 0 ? "#f2f2f2" : "white",
                            }}
                          >
                            {item2?.max_marks ?? "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ background: "#e6e7e8", padding: "5px" }}>
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Total marks
                  </span>
                  <span>
                    {item.marks_scored ?? 0} out of {item.category_marks ?? 0}
                  </span>
                </div>
                {/* </div> */}
              </div>
            </div>
          </>
        ))}
      </View>
    </Page>
  </Document>
);

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    // width: "100%",
    // margin: 'auto',
    // backgroundColor: "red"
  },
  logo: {
    height: "200px",
    width: "350px",
  },
  table_div: {
    padding: "20px",
    margin: "20px",
  },
  heading: {
    // marginLeft: "10px",
  },
  heading2: {
    marginLeft: "20px",
    marginTop: "8px",
  },
  pdf_head: {
    marginLeft: "35px",
    borderBottom: "2px solid rgb(238 238 238)",
    display: "flex",
    width: "60% ",
  },
  ppt1: {
    // display: "flex",
    width: "60%",
  },
  ppt2: {},
  ppt3: {
    border: "2px solid rgb(28 189 92)",
    display: "flex",
    width: "60%",
  },
  ppt4: {},
  table_head: {
    marginLeft: "20px !important",
  },
  table_div1: {
    width: "100%",
    // padding: "10px",
    // display: 'flex'
  },
  table1: {
    border: "1px solid black",
    width: "100%",
  },
  table3: {
    border: "1px solid black",
    width: "100%",
  },

  table_head: {
    border: "1px solid black",
  },
  table_data: {
    border: "1px solid black",
  },
});

export default ResultCopy;
