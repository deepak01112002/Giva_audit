import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import cx from "classnames";

const ImageComponent = (props) => {
    const classNames = styles(props);
    const {
        alt = '',
        objectFit = "contain",
        height = "100%",
        width = "100%",
        classes = {
            root: "",
            image: "",
        },
        imgStyle ={},
        ...restProps
    } = props;

    let objectFitClass = "";
    if (objectFit === "contain") {
        objectFitClass = classNames.image_contain
    } else {
        objectFitClass = classNames.image_cover
    }

    return (
        <div className={`${classNames.root} ${classes.root ? classes.root : ""}`} style={{ height, width }}>
            <img alt={alt} style={imgStyle} className={cx(classNames.image, objectFitClass, classes.image)} {...restProps} />
        </div>
    )
};

const styles = makeStyles((theme) => createStyles({
    root: {
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    image_contain: {
        objectFit: "contain",
    },
    image_cover: {
        objectFit: "cover",
    }
}))

export default ImageComponent;
