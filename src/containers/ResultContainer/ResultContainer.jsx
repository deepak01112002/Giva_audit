import { CircularProgress, Grid } from "@mui/material";
import React, { Component } from "react";

import Stack from "../../common/Stack";
import withNavigate from "../../routes/withNavigate";
import { pdf } from "@react-pdf/renderer";
import Report from "../../components/Report.jsx";
import { prefetchImages } from "../../components/Report.jsx";
import Result from "../../components/Result";

const STORE_NAME_KEY = "store name";
const isBlank = (v) => v === undefined || v === null || String(v).trim() === "";

// The generatepdf API sometimes returns an empty "Store Name" in audit_details
// even though the audit list (fetchUsers) has it. Fill only the blank value,
// never overwrite a real one, and never mutate the (frozen) redux object.
const withStoreName = (pdfData, storeName) => {
  const details = pdfData?.audit_details;
  if (!details || isBlank(storeName)) return pdfData;

  if (Array.isArray(details)) {
    let changed = false;
    const next = details.map((item) => {
      if (
        String(item?.key ?? "").trim().toLowerCase() === STORE_NAME_KEY &&
        isBlank(item?.value)
      ) {
        changed = true;
        return { ...item, value: storeName };
      }
      return item;
    });
    return changed ? { ...pdfData, audit_details: next } : pdfData;
  }

  if (typeof details === "object") {
    const key = Object.keys(details).find(
      (k) => k.trim().toLowerCase() === STORE_NAME_KEY
    );
    if (key && isBlank(details[key])) {
      return { ...pdfData, audit_details: { ...details, [key]: storeName } };
    }
  }
  return pdfData;
};

class ResultContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isPrinted: false,
      generatingPdf: false,
    };
  }

  componentDidMount() {
    this.props.fetchPdfData({
      username: this.props.userID,
      form_id: this.props.formID,
    });
  }

  async handleGeneratePdf() {
    const data = await this.props.fetchPdfData({
      username: this.props.userID,
      form_id: this.props.formID,
    });
    const pdfData = data?.payload ?? this.props.pdfData;
    this.handleGeneratePdf2(pdfData);
  }

  async handleGeneratePdf2(pdfDataArg) {
    const dataToUse = withStoreName(
      pdfDataArg || this.props.pdfData,
      this.props.storeName
    );
    if (!dataToUse || Object.keys(dataToUse).length === 0) {
      console.error("No data available for PDF generation");
      return;
    }

    this.setState({ generatingPdf: true });
    try {
      const imageMap = await prefetchImages(dataToUse);
      const store_name =
        dataToUse.audit_details?.["Store Name"] ||
        this.props.storeName ||
        "document";
      const blob = await pdf(<Report data={dataToUse} imageMap={imageMap} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${store_name}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      this.setState({ generatingPdf: false });
      const url = new URL(window.location.href);
      if (url.searchParams.get("view") == 1) {
        this.props.navigate(-1);
      }
    }
  }

  componentDidUpdate() {
    const url = new URL(window.location.href);
    if (
      !this.state.isPrinted &&
      url.searchParams.get("view") == 1 &&
      !this.props.pdfDataLoading &&
      Object.keys(this.props.pdfData).length > 0
    ) {
      this.setState({ isPrinted: true }, () => {
        this.handleGeneratePdf2(this.props.pdfData);
      });
    }
  }

  render() {
    if (this.props.pdfDataLoading) {
      return (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <CircularProgress />
          <div style={{ marginLeft: "16px" }}>
            {this.state.generatingPdf
              ? "Preparing Large PDF Report... Please wait."
              : "Loading Data..."}
          </div>
        </Stack>
      );
    }

    return (
      <>
        <Grid container>
          <Grid item lg={12} xs={12} md={12}>
            {Object.keys(this.props.pdfData).length > 0 ? (
              <Result
                auditDetails={
                  withStoreName(this.props.pdfData, this.props.storeName)
                    .audit_details
                }
                categoryResult={this.props.pdfData.categories_result}
                category_percentages={this.props.pdfData.category_percentages}
                overall_percentage={this.props.pdfData.overall_percentage ?? 0}
                images={this.props.pdfData.images}
              />
            ) : (
              !this.state.generatingPdf && (
                <div style={{ textAlign: "center", padding: "50px" }}>
                  No report data found.
                </div>
              )
            )}

            {this.state.generatingPdf && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <CircularProgress size={60} />
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
                >
                  Generating PDF Report...
                </div>
                <div style={{ color: "grey", marginTop: "10px" }}>
                  This may take a moment due to high-resolution images.
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withNavigate(ResultContainer);
