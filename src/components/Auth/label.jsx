import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    label__block: {
        padding: '14px 0',
        fontSize: '14px',
        color: '#b1b1b1'
    },
}));
export default function Label(props) {
    const classes = useStyles();

    return (
        <div className={classes.label__block}>
            <label>{props.name}</label>
        </div>
    )
}
