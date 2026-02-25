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
import Snackbar from "../../common/Snackbar.jsx";

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: "",
      error: false,
      serverErrorMessage: "",
      usernameError: ""
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

      if (login_response.data.status === "err") {
        this.setState({
          loading: false,
          serverErrorMessage: login_response.data.msg || "Login failed",
          usernameError: login_response.data.msg || "Login failed",
        });
        return;
      }

      const clientCode = login_response.data?.data?.client_code;
      // Access restricted to specific clients (case-insensitive)
      if (clientCode?.toLowerCase() === "giva" || clientCode?.toLowerCase() === "samsung") {
        authenticate(login_response.data, () => window.location.reload());
        this.setState({
          loading: false,
          serverErrorMessage: "",
          usernameError: ""
        });
      } else {
        this.setState({
          loading: false,
          serverErrorMessage: "You are not permitted to log in",
          usernameError: "You are not permitted to log in",
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        serverErrorMessage: "An unexpected error occurred",
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
        <Snackbar
          open={Boolean(this.state.serverErrorMessage)}
          message={this.state.serverErrorMessage}
          autoHideDuration={4000}
          onClose={() => this.setState({ serverErrorMessage: "" })}
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
                serverErrorMessage={this.state.usernameError}
                resetServerError={() => this.setState({ usernameError: "" })}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withNavigate(LoginContainer);
