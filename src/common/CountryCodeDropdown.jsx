import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CountryCodeDropdown = (props) => {

    const { countriesList, onCountryChange, selectedCountryCode, visibleCountryDropdown, } = props

    let selectedCountryObj = countriesList.find((c) => c.code === selectedCountryCode)
    if (visibleCountryDropdown == true) {
        return (
            <Autocomplete
                id="country-select-demo"
                sx={{ width: 110, outline: "none" }}
                options={countriesList}
                onChange={(event, newValue) => {
                    onCountryChange({ countryCode: newValue.code });
                }}
                size="small"
                getOptionLabel={(option) => option.code}
                defaultValue={selectedCountryObj}
                disableClearable
                disablePortal
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`/images/dashboard/${option.icon}.png`}
                            alt=""
                        />
                        ({option.code})
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label=""
                        placeholder=''
                        {...params}
                        size="small"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
        );
    }
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 110, outline: "none" }}
            options={countriesList}
            onChange={(event, newValue) => {
                onCountryChange({ countryCode: newValue.code });
            }}
            size="small"
            getOptionLabel={(option) => option.code}
            defaultValue={selectedCountryObj}
            disableClearable
            disablePortal
            disabled
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        src={`/images/dashboard/${option.icon}.png`}
                        alt=""
                    />
                    ({option.code})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label=""
                    placeholder=''
                    {...params}
                    size="small"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}

export default React.memo(CountryCodeDropdown);