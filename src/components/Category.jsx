import React, { useState } from 'react'
import Box from '../common/Box';
import SelectCategory from '../common/SelectCategory';
import Button from '../common/Button';
export default function Category(props) {
  const { getAllCategory,getAllCampaign, selectedCategorary, handleOnChane, selectedSubCategory, onSubmit,selectedCampaign,handleCampaingChange } = props.data;




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


        <SelectCategory
          label={'Campaign'}
          value={selectedCampaign}
          dataKey={'name'}
          onChange={(e) => {
            handleCampaingChange(e.target.value, "selectedCampaign")
          }}
          options={getAllCampaign}
        />
        {/* <SelectCategory
          label={'Sub category'}
          value={selectedSubCategory}
          dataKey={'category'}
          onChange={(e) => {
            handleOnChane(e.target.value, "selectedSubCategory")

          }}
          options={selectedCategorary ? getAllSubCategory : []}
        /> */}
        <Button onClick={onSubmit} disabled={selectedCategorary ? false : true} sx={{ width: "500px", marginTop: "50px" }} size="large" variant="contained">Continue</Button>

      </Box>

    </div>
  )
}
