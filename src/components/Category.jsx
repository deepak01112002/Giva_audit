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
          id="auto-select"
          autoSelect
          options={storeData}
          value={selectedStore} 
          getOptionLabel={(option) => option.store_code || ''} // Display 'store_name' property
          onChange={(_, value) => handleStoreSelection(value)}
          sx={{ width: '500px',  margin: '1rem' }}
          renderInput={(params) => (
            <TextField {...params} label="Store Code" size="small" />
          )}
        />

        <Autocomplete
          id="auto-select"
          autoSelect
          options={storeData}
          value={selectedStore} 
          disabled
          getOptionLabel={(option) => option.store_name || ''} // Display 'store_name' property
          onChange={(_, value) => handleStoreSelection(value)}
          sx={{ width: '500px', margin: '0rem 1rem ' }}
          renderInput={(params) => (
            <TextField {...params} label="Store Name" size="small" />
          )}
        />

        <Button
          onClick={onSubmit}
          // disabled={selectedCategorary ? false : true}
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
