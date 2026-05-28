import React from "react";
import Box from "../../common/Box";
import { imgBaseUrl } from "../../helpers/constants";

export default function MDropzoneDialog({
  handleOnChange,
  handleClose,
  value,
  imageValue
}) {
  const [imgUrls, setImgUrls] = React.useState([]);

  const onChange = (val) => {
    if (val.target.files && val.target.files.length > 0) {
      const files = Array.from(val.target.files);
      const urls = files.map(file => URL.createObjectURL(file));
      setImgUrls(urls);
    } else {
      setImgUrls([]);
    }
    handleOnChange(val);
  };

  const getImagesToPreview = () => {
    if (imgUrls.length > 0) {
      return imgUrls;
    }
    const valToUse = imageValue || value;
    if (valToUse) {
      if (typeof valToUse === 'string') {
        return valToUse.split(',').map(p => p.trim()).filter(Boolean).map(val => {
          if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('blob:')) {
            return val;
          }
          return imgBaseUrl + val;
        });
      } else if (Array.isArray(valToUse)) {
        return valToUse;
      }
    }
    return [];
  };

  const previewImages = getImagesToPreview();

  return (
    <div>
      {previewImages.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {previewImages.map((src, idx) => (
            <Box
              key={idx}
              sx={{
                border: "1px solid #c7c7c7",
                display: "flex",
                padding: "5px",
                borderRadius: "7px",
                justifyContent: "center",
                alignItems: "center",
                width: '100px',
                height: '100px'
              }}
            >
              <img src={src} height="100%" width="100%" style={{ objectFit: 'contain' }} />
            </Box>
          ))}
        </Box>
      ) : null}
      <Box
        sx={{
          border: "1px solid #c7c7c7",
          marginTop: "20px",
          marginBottom: "20px",
          padding: "7px",
          borderRadius: "7px",
          paddingBottom: "9px",
        }}
      >
        <input onChange={onChange} type="file" multiple />
      </Box>
    </div>
  );
}
