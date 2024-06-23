import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import WelcomeImage from "../../components/WelcomeImage.jsx";
import LoginFormComponent from "../../components/login/LoginForm.jsx";
import { axios } from "../../helpers/axios.js";
import { loginApi } from "../../helpers/constants.js";
import { authenticate } from "../../helpers/cookies.js";
import withNavigate from "../../routes/withNavigate";
import DialogD from "../../common/DialogD.jsx";

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: "",
      error: false,
    };
  }

  handleVerifyOtp = async (data) => {
    try {
      this.setState({
        loading: true,
      });
      data.source = this.props.sourceType;
      const login_response = await axios.get(loginApi, {
        params: data,
      });

      //internal_admin,
      //admin
      // if (login_response.data.data.client_code === "sleep") {
        authenticate(login_response.data, () => window.location.reload());
      // } else {
      //   this.setState({
      //     error: true,
      //   });
      // }
      this.setState({
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <>
        <DialogD
          message1={"You are not eligible for audit"}
          handleClose={() => this.setState({ error: false })}
          open={this.state.error}
        />
        <Box>
          <Grid sx={{ height: "100vh" }} container spacing={0}>
            <Grid item xs={5}>
              <WelcomeImage />
            </Grid>
            <Grid item xs={7}>
              <LoginFormComponent
                loading={loading}
                submitOtp={this.handleVerifyOtp}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withNavigate(LoginContainer);
