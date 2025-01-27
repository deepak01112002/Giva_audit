import React, { Component } from "react";
import ResponsiveAppBar from "../../components/Appbar";
import { CircularProgress } from "@mui/material";
import Select from "../../common/Select";
import Box from "../../common/Box";
import InputLabel from "../../common/InputLabel";
import Button from "../../common/Button";
import Stack from "../../common/Stack";
import AppStyle from "../../utils/colors";
import withNavigate from "../../routes/withNavigate";

class StoreContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStoreIndex: 0,
    };
  }

  componentDidMount() {
    this.props.getStoreData();
  }

  onContinueClick = async () => {
    let storeData = this.props.storeData[this.state.selectedStoreIndex];
    await this.props.setStoreCreds({
      storeName: storeData["store_name"],
      storeCode: storeData["store_code"],
    });
    this.props.navigate(`/dashboard`);
  };

  render() {
    const { storeData } = this.props;

    return (
      <>
        <ResponsiveAppBar />
        {storeData?.length > 0 ? (
          <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              height: "100%",
            }}
          >
            <InputLabel>Please select Store befor your continue.</InputLabel>
            <Box sx={{ marginTop: "10px", width: "50%" }}>
              <Select
                placeholder={"Select store"}
                required={true}
                onChange={(e) => {
                }}
                data={storeData.map((e) => e.store_name)}
                sx={{ marginTop: "10px", width: "50%" }}
              />
            </Box>
            <Button
              sx={{
                marginTop: "8px",
                background: AppStyle.primaryBG,
                "&:hover": {
                  backgroundColor: AppStyle.primaryBG,
                },
              }}
              onClick={this.onContinueClick}
            >
              Continue
            </Button>
          </Stack>
        ) : (
          <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              height: "100%",
            }}
          >
            <CircularProgress />
          </Stack>
        )}
      </>
    );
  }
}

export default withNavigate(StoreContainer);
