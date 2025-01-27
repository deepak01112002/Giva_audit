import MContainer from "@mui/material/Container";

const Container = ({ children, ...restProps }) => {
    return <MContainer {...restProps}>{children}</MContainer>;
};

export default Container;
