import { CircularProgress, Grid } from "@mui/material";
import React, { Component } from "react";

import Stack from "../../common/Stack";

import withNavigate from "../../routes/withNavigate";
import jsPDF from "jspdf";
import ResultCopy from "../../components/ResultCopy";

class ResultContainer extends Component {
  constructor(props) {
    super(props);
    this.reportTemplateRef = React.createRef();
    this.state = {
      value: 0,
      isPrinted: false,
      mWidth: "97vw"
    };
  }

  componentDidMount() {
    this.props.fetchPdfData({
      username: this.props.userID,
      form_id: this.props.formID,
    });
  }
  async handleGeneratePdf(){
    await this.props.fetchPdfData({
      username: this.props.userID,
      form_id: this.props.formID,
    });
     this.handleGeneratePdf2()

  }

  handleGeneratePdf2(){
    const doc = new jsPDF({
      orientation: "l",
      unit: "pt",
      format: "a4",
    });

    const store_name = this.props.pdfData.audit_details?.[`Store Name`]

    // Adding the fonts
    doc.setFont("Inter-Regular", "normal");

    doc.html(this.reportTemplateRef.current, {
      async callback(doc) {
        doc.save(`${store_name?? "document"}`);
      },
    });
    this.props.navigate(-1);

  }

  componentDidUpdate(){
    const url = new URL(window.location.href);
    let paramView = url.searchParams.get("view") ?? 0;

    if (
      !this.state.isPrinted &&
      (url.searchParams.get("view") ?? 0 == 1) &&
      !this.props.pdfDataLoading
    ) {
      // window.print();
      // window.onafterprint = function () {
      //   console.log("Printing completed...");
        // window.close();
        this.handleGeneratePdf()
        this.setState({
          mWidth: "40vw" 
        })
      // };
      this.setState({
        isPrinted: true,
      });
    }
  }

  render() {

    if (this.props.pdfDataLoading) {
      return (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      );
    }

      // Adding the fonts
    return (
      <>
        <Grid container>
          <Grid item lg={12} xs={12} md={12}>
            {/* <ResponsiveAppBar /> */}

            {/* {Object.keys(this.props.pdfData).length > 0 ? (
              <Result
                auditDetails={this.props.pdfData.audit_details}
                categoryResult={this.props.pdfData.categories_result}
                category_percentages={this.props.pdfData.category_percentages}
                overall_percentage={this.props.pdfData.overall_percentage??0}
                images={this.props.pdfData.images}
              />
            ) : null} */}
            <div ref={this.reportTemplateRef}>
              <ResultCopy mWidth={this.state.mWidth} data={this.props.pdfData} />
            </div>

            
            {/* <div style={{ display: "flex" }}>
              <button className="button" onClick={handleGeneratePdf}>
                Download PDF
              </button>
              <button
                className="button"
                onClick={() => {
                  //  handleNext()
                }}
              >
                Next
              </button>
            </div> */}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withNavigate(ResultContainer);

