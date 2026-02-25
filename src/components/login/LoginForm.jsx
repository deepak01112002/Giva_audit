import React from "react";
import Button from "../../common/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import Input from "../../common/Input";
import * as yup from "yup";
import AppStyle from "../../utils/colors"

const validateLoginForm = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginFormComponent = (props) => {
  const { submitOtp, loading } = props;
  const initialValues = {
    username: "",
    password: "",
  };

  const onFormSubmit = async (values) => {
    submitOtp(values);
  };
  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onFormSubmit(values)}
        validationSchema={validateLoginForm}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          values,
          touched,
          errors,
        }) => (
          <>
            <Container maxWidth="xs">
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: "100vh",
                  width: "auto",
                  mx: 4,
                }}
                spacing={1.5}
              >
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    fontWeight: "600",
                    textTransform: "uppercase",
                    fontSize: "28px",
                  }}
                >
                  Login
                </Typography>

                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ fontSize: "15px", color: "#7D7D7D" }}
                >
                  Welcome Back
                </Typography>

                <Input
                  type="text"
                  fullWidth
                  placeholder="Enter Username"
                  id="username"
                  name="username"
                  variant="outlined"
                  onChange={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  error={Boolean(props.serverErrorMessage) || (touched.username && Boolean(errors.username))}
                  helperText={props.serverErrorMessage || (touched.username && errors.username)}
                />
                <Input
                  type="password"
                  fullWidth
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  variant="outlined"
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}

                  onKeyPress={(e) => {
                    if (e.key === "Enter") {

                      handleSubmit();

                    }
                  }}

                />

                <Button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  loading={loading}
                  fullWidth
                  sx={{
                    backgroundColor: AppStyle.primaryBG,
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: AppStyle.primaryBG,
                    },
                  }}
                >
                  Login
                </Button>

              </Stack>
            </Container>
          </>
        )}
      </Formik>
    </div>
  );
};
export default LoginFormComponent;
