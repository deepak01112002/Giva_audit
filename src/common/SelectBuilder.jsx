import React from 'react';
import Select from './Select';
import InputLabel from './InputLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SelectBuilder = (attributes) => {
	let value = '';
	if (Object.keys(attributes.inputValue).length > 0) {
		if (attributes.attributes.props.name in attributes.inputValue) {
			value = attributes.inputValue[attributes.attributes.props.name]['answer'] ?? null;
		}
	}

	let drop = (attributes?.attributes?.contentvalue ?? []).map((e) => e.props.innerHTML);
	let extraData = (attributes?.attributes?.contentvalue ?? []).map((e) => e.extraData);

	let storeCode = (attributes?.attributes?.contentvalue ?? []).map((e) => {
		let concatenatedValue = e?.extraData?.store_name + ' - ' + e?.extraData?.store_code;
		return concatenatedValue;
	});

	const defaultProps = {
		options: storeCode,
		getOptionLabel: (option) => option,
	};

	return (
		<>
			<InputLabel id={attributes.attributes.props.name}>{attributes.label}</InputLabel>
			{attributes.label === 'Store Name' ? (
				<Autocomplete
					{...defaultProps}
					id='auto-select'
					autoSelect
					value={value}
					renderInput={(params) => <TextField {...params} label={attributes.label} variant='standard' />}
					onChange={(event, newValue) => {
						attributes.handleOnChange(newValue, attributes.attributes.props.name, extraData,event);
					}}
				/>
			) : (
				<Select
					id={attributes.attributes.props.name}
					placeholder={attributes.label}
					required={attributes.attributes.props.required}
					onChange={(e) => {
						console.log(e);
						attributes.handleOnChange(e, attributes.attributes.props.name, extraData);
					}}
					value={value}
					data={drop}
					sx={{ marginTop: '10px' }}
				/>
			)}
		</>
	);
};

export default SelectBuilder;
