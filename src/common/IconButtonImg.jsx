import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const IconButtonImg = ({ title = "title", src, alt, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        onClick={onClick}
        color="primary"
        aria-label={alt}
        component="span"
      >
        <img src={src} alt={alt} />
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonImg;
