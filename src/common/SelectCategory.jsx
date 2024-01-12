import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Text from './Text';
import Box from './Box';

function SelectCategory(props) {
    const { options, dataKey, style, label } = props;
    return (
        <Box sx={{ width: '100px important' }}>
            <FormControl fullWidth size="small" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    id="demo-simple-select"
                    value={props.value}
                    sx={{ ...style, width: '500px' }}
                    onChange={(e) => {
                        if (props.onChange) {
                            props.onChange(e);
                        }
                    }}
                    label={label}
                >
                    {options?.map((value, index) => {
                        return (
                            <MenuItem value={value._id} key={index}  >
                                <Text style={{ fontSize: 13, fontWeight: '600' }}>
                                    {value[dataKey] ?? " "}
                                </Text>
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}

export default SelectCategory;
