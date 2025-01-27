import PropTypes from 'prop-types';
import { CircularProgress, Grid } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import Stack from '../../common/Stack';
import Report from '../../components/Report';
import { PDFViewer } from '@react-pdf/renderer';

const PdfContainer = ({ userID, formID, fetchPdfData, pdfData, pdfDataLoading }) => {
  const [mWidth, setMWidth] = useState('75vw');
  const reportTemplateRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search); // Access query params
    const formIDFromURL = params.get('form_id'); // Extract form_id

    if (location.pathname === '/pdf' && formIDFromURL) {
      // If the URL is '/pdf' and contains 'form_id'
      fetchPdfData({
        username: 'giva_test', // Static username
        form_id: formIDFromURL, // Take form_id from query params
      });
    } else {
      // Run normally
      fetchPdfData({
        username: userID,
        form_id: formID,
      });
    }
  }, [location, userID, formID, fetchPdfData]); // Dependencies

  if (pdfDataLoading) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Grid container>
      <Grid item lg={12} xs={12} md={12}>
        <PDFViewer
          style={{
            width: '100%',
            height: '100vh',
          }}
          showToolbar={true}
          innerRef={reportTemplateRef}
        >
          <Report mWidth={mWidth} data={pdfData} />
        </PDFViewer>
      </Grid>
    </Grid>
  );
};

PdfContainer.propTypes = {
  userID: PropTypes.string.isRequired,
  formID: PropTypes.string.isRequired,
  pdfData: PropTypes.object,
  pdfDataLoading: PropTypes.bool.isRequired,
  fetchPdfData: PropTypes.func.isRequired,
};

export default PdfContainer;
