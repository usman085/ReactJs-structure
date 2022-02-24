import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from "react-hook-form";
import SelectMat from 'react-select';
import { addClass,getSubject,updateClass} from '../../../api/api.js'
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

export default function ClassForm(props) {
    const customStyles = {
        menu: provided => ({ ...provided,  maxHeight: "150px", overFlow: "scroll" }),
        menuList: (provided, state) => ({
            ...provided,
            maxHeight: "150px"
            // background: 'blue',
        }),
        control: (base, state) => ({
            ...base,
        })
    }
    const classes = useStyles();
    const [subjects, setSubjects] = React.useState([]);
    
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
        addClass(data).then((res) => {
            toast.success(res.data.message, toastOptions);
            reset({ 'class_name': '','subject_id':"" });
            props.close()
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
        updateClass(data).then((res) => {
            dispatch(toggle());
            toast.success(res.data.message, toastOptions);
            reset({ 'class_name': '','subject_id':''});
         
            props.onFormSubmit();
        })
            .catch(err => {
                dispatch(toggle());
                toast.error(err.response.data.error, toastOptions);
            })
    }

    const addEditMode = (data) => {
        if (data) {
            setValue('class_name', props.data.class_name, { shouldValidate: true })
            setValue('subject_id', props.data.subjects, { shouldValidate: true })
            
            
            setIsAddEdit(true);
        }
    }
    const fetchSubjects = () => {
        dispatch(toggle())

        getSubject()
            .then(res => {
        dispatch(toggle())
        setSubjects([...res.data.data])
  
        })
    }
    useEffect(() => {
        fetchSubjects()
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
                            name="class_name"
                            as={<TextField
                                error={errors.class_name ? true : false}
                                id="class_name" style={{ width: '100%' }} margin="dense" variant="outlined"
                                label="Class Name" helperText={errors.class_name ? <span>Class name is required</span> : null} />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Required',
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                    <div>
                    <Controller
                                name="subject_id"
                                as={<SelectMat
                                    placeholder={<div>Select Subjects</div>}
                                    isMulti
                                    styles={customStyles}
                                    label="test"
                                    id="subject_id"

                                    options={subjects}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    className="basic-multi-select"
                                    classNamePrefix="select-react"
                                />} control={control}
                                defaultValue="" rules={{
                                    required: 'Required',
                                }}
                            />
                            <span>{errors.subject_id ? <span>Subject is reqiured</span> : null}</span>

                        
                        </div>
                    </Grid>
              
                    <Grid item md={12} xs={12}>
                        <div style={{ textAlign: "right" }}>
                            <ButtonGroup size="small" variant="contained">
                                <Button color="primary" type="submit">
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