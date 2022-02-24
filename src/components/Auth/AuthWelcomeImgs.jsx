import React from 'react'
import { Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    img__file: {
        width: '100%',
        height: 'auto',
    },
}));

export default function AuthWelcomeImgs(props) {
    const classes = useStyles();

    return (
        <Box component="div" className="img__wrapper">
            <div className="img__content">
                <img src={props.img} alt="Img" className={classes.img__file} />
            </div>
        </Box>
    )
}
