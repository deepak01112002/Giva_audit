import  { useState } from 'react';
import Box from '../../common/Box';
import CTable from '../../common/CTable';
import Stack from '../../common/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '../../common/Button';
import Text from '../../common/Text';
import AppStyle from '../../utils/colors';
import MDatePicker from '../../common/DatePicker';
import Role from '../../utils/roles';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import Link from '@mui/material/Link';

import {
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
} from '@mui/material';

export default function InternalAdminTable({
  navigate,
  tableData,
  handleOnViewClick,
  onEditClick,
  handleOnDownlodClick,
  role,
  handleSelectDate,
  handleFilter,
  userDataLoading,
  handleCsvClick,
  compaignList,
  handleCampaignChange,
  handleOnDeleteClick,
  handleApproveOnClick,
  regionList,
  citiesList,
  // statesList,
  handleRegionChange,
  // handleStatesChange,
  handleCitiesChange,
}) {
  const [inputText, setInputText] = useState('');
  let inputSearchHandler = (e) => {
    var lowerCase = e.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = tableData?.filter((el) => {
    if (inputText === '') {
      return el;
    } else {
      const inputLowerCase = inputText.toLowerCase();
      return (
        el?.store_code?.toLowerCase().includes(inputLowerCase) ||
        el?.Campaign?.toLowerCase().includes(inputLowerCase) ||
        el?.Store?.toLowerCase().includes(inputLowerCase) ||
        el?.Region?.toLowerCase().includes(inputLowerCase)
      );
    }
  });

  const columns = [
    {
      field: 'Campaign',
      headerName: 'Campaign Name',
    },
    {
      field: 'store_code',
      headerName: 'Store code',
    },
    {
      field: 'Store',
      headerName: 'Store Name',
    },
    {
      field: 'City',
      headerName: 'City',
    },
    {
      field: 'State',
      headerName: 'State',
    },
    {
      field: 'Region',
      headerName: 'Region',
    },
    {
      field: 'score',
      headerName: 'Actions',

      valueGetter: (v, d) => {
        return (
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            sx={{
              padding: 1,
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
      
            {role === Role.internalAdmin && (
              <>
                {/* Edit Icon */}
               
                  <IconButton
                    size="small"
                    sx={{ color: '#43a047', '&:hover': { color: '#388e3c' } }}
                    onClick={() => {
                      onEditClick({
                        formID: d.formId,
                        userID: d.username,
                        selectedCategorary: d.category_id,
                        campaign_id: d.campaign_id,
                        name: d.Campaign,
                      });
                    }}
                  >
                    <EditIcon />
                  </IconButton>
          
      
                {/* Delete Icon */}
               
                  <IconButton
                    size="small"
                    sx={{ color: '#e53935', '&:hover': { color: '#c62828' } }}
                    onClick={() => {
                      handleOnDeleteClick(d.formId);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
              
                {/* Download Icon */}
               
                  <IconButton
                    size="small"
                    sx={{ color: '#ffb300', '&:hover': { color: '#ffa000' } }}
                    onClick={() => {
                      handleOnDownlodClick({
                        formID: d.formId,
                        userID: d.username,
                      });
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
          
      
                {/* Approve Button */}
                {d?.audit_status !== 'APPROVED' && (
                  
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      sx={{
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        borderRadius: '20px',
                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                        '&:hover': { backgroundColor: '#1565c0' },
                      }}
                      onClick={() => {
                        handleApproveOnClick(d.formId);
                      }}
                    >
                      Approve
                    </Button>
             
                )}
              </>
            )}
          </Stack>
        );
      }
      
    },
  ];

  return (
    <div style={{ padding: '30px' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundColor: AppStyle.primaryBG,
          padding: 2,
          borderRadius: '10px 10px 0px 0px',
        }}
      >
        <Text
          sx={{
            color: AppStyle.primaryText,
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          Audit list
        </Text>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            sx={{
              backgroundColor: AppStyle.primaryText,
              color: AppStyle.primaryBG,
              '&:hover': {
                backgroundColor: AppStyle.primaryText,
                color: AppStyle.primaryBG,
              },
            }}
            onClick={handleCsvClick}
          >
            Export CSV
          </Button>
        </Stack>
      </Stack>
      <Stack
        container
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        <Box flex={2} sx={{ width: '20%' }}>
          <Paper
            sx={{
              marginTop: '15px',
              p: '2.5px 0',
              display: 'flex',
              alignItems: 'center',
              width: '200px',
              height: '45px',
            }}
          >
            <IconButton type="submit" sx={{ p: '5px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              onChange={(e) => inputSearchHandler(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Paper>
        </Box>
        <Box flex={2} sx={{ width: '20%' }}>
          <MDatePicker
            // value={selectedDates?.sdate ?? new Date()}
            onChange={(date) => {
              if (Date.parse(date)) {
                handleSelectDate(date, 'sdate');
              }
            }}
          />
        </Box>
        <Box flex={2}>
          <MDatePicker
            // value={new Date().toISOString()}
            onChange={(date) => {
              if (Date.parse(date)) {
                handleSelectDate(date, 'edate');
              }
            }}
          />
        </Box>
        <Box flex={2}>
          <FormControl sx={{ m: 1, minWidth: '100%', width: 50 }}>
            <InputLabel id="demo-select-small-label">Campaign</InputLabel>
            <Select
              sx={{ marginRight: 0 }}
              size="big"
              label="Compaign"
              labelId="demo-select-small-label"
              placeholder="Select"
              onChange={(item) => {
                handleCampaignChange(item.target.value);
              }}
            >
              {compaignList?.length > 0
                ? compaignList.map((item, i) => {
                    return <MenuItem value={item._id}>{item.name}</MenuItem>;
                  })
                : null}
            </Select>
          </FormControl>
        </Box>
        <Box flex={2}>
          <FormControl sx={{ m: 1, minWidth: '100%', width: 50 }}>
            <InputLabel id="demo-select-small-label">Region</InputLabel>
            <Select
              sx={{ marginRight: 0 }}
              size="big"
              label="Compaign"
              labelId="demo-select-small-label"
              placeholder="Select"
              onChange={(item) => {
                handleRegionChange(item.target.value);
              }}
            >
              {regionList?.length > 0
                ? regionList.map((item, i) => {
                    return <MenuItem value={item}>{item}</MenuItem>;
                  })
                : null}
            </Select>
          </FormControl>
        </Box>
        <Box flex={2}>
          <FormControl sx={{ m: 1, minWidth: '100%', width: 50 }}>
            <InputLabel id="demo-select-small-label">City</InputLabel>
            <Select
              sx={{ marginRight: 0 }}
              size="big"
              label="Compaign"
              labelId="demo-select-small-label"
              placeholder="Select"
              onChange={(item) => {
                handleCitiesChange(item.target.value);
              }}
            >
              {citiesList?.length > 0
                ? citiesList.map((item, i) => {
                    return <MenuItem value={item}>{item}</MenuItem>;
                  })
                : null}
            </Select>
          </FormControl>
        </Box>
        {/* <Box flex={2}>
          <FormControl sx={{ m: 1, minWidth: "100%", width: 50 }}>
            <InputLabel id="demo-select-small-label">State</InputLabel>
            <Select
              sx={{ marginRight: 0 }}
              size="big"
              label="Compaign"
              labelId="demo-select-small-label"
              placeholder="Select"
              onChange={(item) => {
                handleStatesChange(item.target.value);
              }}
            >
              {statesList?.length > 0
                ? statesList.map((item, i) => {
                    return <MenuItem value={item}>{item}</MenuItem>;
                  })
                : null}
            </Select>
          </FormControl>
        </Box> */}
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            // paddingTop: "1.2%",
          }}
        >
          <Button sx={{ height: 50, width: 100 }} onClick={handleFilter}>
            Filter
          </Button>
        </Box>
      </Stack>
      <CTable
        isLoading={userDataLoading}
        columns={columns}
        data={filteredData}
      />
    </div>
  );
}
