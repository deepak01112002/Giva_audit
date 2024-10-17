import React, { useState } from 'react'
import Box from '../common/Box';
import SelectCategory from '../common/SelectCategory';
import Button from '../common/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
export default function Category(props) {
  const { getAllCategory,getAllCampaign, selectedCategorary, handleOnChane, selectedSubCategory, onSubmit,selectedCampaign,handleCampaingChange,setSelectedCampaignName } = props.data;




  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '90vh' }}>
        <SelectCategory
          label={'Category'}
          value={selectedCategorary}
          dataKey={'category'}
          onChange={(e) => {
            handleOnChane(e.target.value, "selectedCategorary")
          }}
          options={getAllCategory}
        />

        
<FormControl sx={{ m: 1, minWidth: "33%",  }}>
            <InputLabel id="demo-select-small-label">Campaign</InputLabel>
            <Select
              sx={{ marginRight: 0 }}
              size="small"
              label="Compaign"
              labelId="demo-select-small-label"
              placeholder="Select"
              value={selectedCampaign.id}
              onChange={(e) => {
                handleCampaingChange(e.target.value,"selectedCampaign")
              }}
            >
              {getAllCampaign?.length > 0
                ? getAllCampaign.map((item, i) => {           
                    return <MenuItem value={i}>{item.name}</MenuItem>

                  })
                : null}
            </Select>
          </FormControl>

        <Button onClick={onSubmit} disabled={selectedCategorary ? false : true} sx={{ width: "500px", marginTop: "50px" }} size="large" variant="contained">Continue</Button>

      </Box>

    </div>
  )
}
