import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const IconButtonIcons = ({
  title = "title",
  IconComponent,
  onClick,
  color = "primary",
  disabled = false,
}) => {
  return (
    <Tooltip title={title}>
      <IconButton
        onClick={onClick}
        color={color}
        disabled={disabled}
        component="span"
      >
        <IconComponent />
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonIcons;
