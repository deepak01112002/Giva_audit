/**
 *
 * Link
 *
 */

import React from "react";
import NLink from "@mui/material/Link";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

function Link(props) {

    const { children, href = "/", ...restProps } = props;

    return (
        <NLink component={RouterLink} to={href} {...restProps}>
            {children}
        </NLink>
    );
}

Link.propTypes = {
    children: PropTypes.node,
};

export default Link;
