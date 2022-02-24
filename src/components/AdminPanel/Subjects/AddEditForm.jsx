import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from "react-hook-form";
import { addSubject, updateSubject } from '../../../api/api.js'
import { toast } from 'react-toastify';
import ToastContext from '../../../context/ToastContext';
import { toggle } from '../../../actions/pacerActions';
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '500px',
        },
    },
}));

export default function Form(props) {

    const classes = useStyles();

    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const { register, reset, formState: { isValid }, setValue, control, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const toastOptions = useContext(ToastContext);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
      
        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.id;
            update(data);
        }


    };
    const create = (data) => {
        dispatch(toggle());
        addSubject(data).then((res) => {
            toast.success(res.data.message, toastOptions);
            reset({ 'subject_name': '' });
            // props.close()
            props.onFormSubmit()
            dispatch(toggle());
         
           
        })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const update = (data) => {
        console.log(data)
        dispatch(toggle());
        updateSubject(data).then((res) => {
            dispatch(toggle());
            toast.success(res.data.message, toastOptions);
            reset({ 'subject_name': ''});
         
            props.onFormSubmit();
        })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const addEditMode = (data) => {
        if (data) {
            setValue('subject_name', props.data.name, { shouldValidate: true })
            setIsAddEdit(true);
        }
    }
    useEffect(() => {
        
        if (props.isAdd=== true) {
            setIsAddEdit(false);
        }
        else{
            addEditMode(props.data)
        }
    }, [])
    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <Controller
                            name="subject_name"
                            as={<TextField
                                error={errors.subject_name ? true : false}
                                id="subject_name" style={{ width: '100%' }} margin="dense" variant="outlined"
                                label="Subject Name" helperText={errors.subject_name ? <span>Subject name is required</span> : null} />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Required',
                            }}
                        />
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <div style={{ textAlign: "right" }}>
                            <ButtonGroup size="small" variant="contained">
                                <Button type="submit" disabled={!isValid} color="primary">
                                    Submit
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>

    );
}