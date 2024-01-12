import React, { useState } from 'react'
import Box from '../common/Box';
import SelectCategory from '../common/SelectCategory';
import Button from '../common/Button';
export default function Category(props) {
  const { getAllCategory, getAllSubCategory, selectedCategorary, handleOnChane } = props.data;
  const [selectSub, setSelectSub] = useState("");

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '90vh' }}>
        <SelectCategory
          label={'Category'}
          value={selectedCategorary}
          dataKey={'catgeory'}
          onChange={(e) => {
            handleOnChane(e.target.value)
          }}
          options={getAllCategory}
        />
        <SelectCategory
          label={'Sub category'}
          value={selectSub}
          dataKey={'category'}
          onChange={(e) => {
            setSelectSub(e.target.value);
          }}
          options={getAllSubCategory}
        />

      </Box>
      <Button variant="contained">Next</Button>

    </div>
  )
}
