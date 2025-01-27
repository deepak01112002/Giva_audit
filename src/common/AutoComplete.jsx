import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

const AutoComplete = ({
    placeholder,
    dataList = [],
    isLoading,
    ...restProps
}) => {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dataList}
            sx={{ width: 300 }}
            disableClearable
            {...restProps}
            renderInput={(params) => (
                <TextField
                    placeholder={placeholder}
                    sx={{
                        backgroundColor: "#F2F6FA",
                        width: "100%",
                        height: "60px",
                        borderRadius: "8px",
                        padding: "13px",
                        maxWidth: "100%",
                    }}
                    {...params}
                    variant="standard"
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
};

export default AutoComplete;
