import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "../../common/Button";
import Box from "../../common/Box";
import Text from "../../common/Text";
import { imgBaseUrl } from "../../helpers/constants";

export default function MDropzoneDialog({
  handleOnChange,
  handleClose,
  value,
  imageValue
}) {
  const [imgUrl, setImgUrl] = React.useState("");

  const onChange = (val) => {
    let reader = new FileReader();

    reader.onload = function (e) {
      setImgUrl(e.target.result);
    };

    reader.readAsDataURL(val.target.files[0]);
    handleOnChange(val);
  };

  const imgReader = (val) => {
    let res = ''
    // let reader = new FileReader();
    // reader.onload = function (e) {
    //   res = e.target.result;
    // };
    // reader.readAsDataURL(val.target.files[0]);
    if(val){

    return  URL.createObjectURL( new Blob([val[0]]))
    }else{
      return ''
    }
  }

  return (
    <div>
      {/* <DropzoneArea /> */}
      {imgUrl || value ? (
        <Box
          sx={{
            border: "1px solid #c7c7c7",
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            padding: "10px",
            borderRadius: "7px",
            // paddingBottom: "9px",
            justifyContent: "center",
            alignItems: "center",
            width: '200px',
            height: '100px'
          }}
        >
          <img src={imageValue ? imageValue : value} height="100%" width="100%"  />
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
        <input onChange={onChange} type="file" />
      </Box>

      {/* <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Image
      </Button> */}
    </div>
  );
}
