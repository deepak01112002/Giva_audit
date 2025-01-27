import React from "react";
import Dropzone from "react-dropzone";
import Box from "components/common/Box";
import Button from "components/common/Button";
import Text from "components/common/Text";
import Stack from "components/common/Stack";

const FileUpload = (props) => {
    const { handleFileSelect, fileType } = props;
    return (
        <>
            <Dropzone onDrop={handleFileSelect} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                    <Box
                        component="span"
                        {...getRootProps()}
                        sx={{
                            p: 2,
                            border: "2px dashed #8BACCC;",
                            borderRadius: "10px",
                            mt: 5,
                            width: "498px",
                            maxWidth: "100%",
                            height: "258px",
                            backgroundColor: "#F5F9FE",
                        }}
                    >
                        <input {...getInputProps()} />
                        <Text
                            sx={{
                                mt: 6,
                                textAlign: "center",
                                color: "#6E6E6E",
                                fontSize: 14,
                            }}
                        >
                            Drag &#38; Drop to upload Excel
                        </Text>

                        <Text
                            sx={{
                                textAlign: "center",
                                mt: 1,
                                color: "#6E6E6E",
                                fontSize: 14,
                            }}
                        >
                            or
                        </Text>

                        <Stack
                            sx={{
                                flexDirection: "row",
                                justifyContent: "center",
                                mt: 1,
                            }}
                        >
                            <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    color: "#FFFFFF",
                                    textAlign: "center",
                                    fontSize: 14,
                                    padding: "10px 25px",
                                    textTransform: "capitalize",
                                    backgroundColor: "#1C81E6",
                                }}
                            >
                                Browse Files
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Dropzone>
        </>
    );
};

export default FileUpload;
