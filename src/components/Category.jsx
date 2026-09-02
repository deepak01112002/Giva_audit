import React, { useState } from 'react';
import Box from '../common/Box';
import SelectCategory from '../common/SelectCategory';
import Button from '../common/Button';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
export default function Category(props) {
  const {
    getAllCategory,
    getAllCampaign,
    selectedCategorary,
    handleOnChane,
    selectedSubCategory,
    onSubmit,
    selectedCampaign,
    handleCampaingChange,
    setSelectedCampaignName,
    storeData,
    selectedStore,
    handleStoreSelection
  } = props.data;
 
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        {/* <SelectCategory
          label={'Category'}
          value={selectedCategorary}
          dataKey={'category'}
          onChange={(e) => {
            handleOnChane(e.target.value, 'selectedCategorary');
          }}
          options={getAllCategory}
        /> */}

        <FormControl sx={{ m: 1, width: '500px', }}>
          <InputLabel id="demo-select-small-label">Campaign</InputLabel>
          <Select
            sx={{ marginRight: 0 }}
            size="small"
            label="Compaign"
            labelId="demo-select-small-label"
            placeholder="Select"
            value={selectedCampaign?.id ?? ''}
            onChange={(e) => {
              handleCampaingChange(e.target.value, 'selectedCampaign');
            }}
          >
            {getAllCampaign?.length > 0
              ? getAllCampaign.map((item) => {
                  return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>;
                })
              : null}
          </Select>
        </FormControl>
        <Autocomplete
          id="store-code-select"
          autoSelect
          options={storeData}
          value={selectedStore}
          getOptionLabel={(option) => option?.store_code || ''}
          isOptionEqualToValue={(option, value) =>
            option?.store_code === value?.store_code
          }
          onChange={(_, value) => handleStoreSelection(value)}
          sx={{ width: '500px', margin: '1rem' }}
          renderInput={(params) => (
            <TextField {...params} label="Store Code" size="small" required />
          )}
        />

        <TextField
          label="Store Name"
          size="small"
          value={selectedStore?.store_name ?? ''}
          required
          disabled
          sx={{ width: '500px', margin: '0rem 1rem' }}
        />

        <Button
          onClick={onSubmit}
          disabled={
            !selectedStore?.store_code ||
            !selectedStore?.store_name ||
            !selectedCampaign?.id
          }
          sx={{ width: '500px', marginTop: '50px' }}
          size="large"
          variant="contained"
        >
          Continue
        </Button>
      </Box>
    </div>
  );
}
