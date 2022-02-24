import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from "react-hook-form";
import SelectMat from 'react-select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getClass, getTutor,updateSession ,createClass,getStudent} from '../../../api/api.js'
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
    formControl: {

        minWidth: "100%",
    },
}));

export default function Form(props) {
    const customStyles = {
        menu: provided => ({ ...provided, zIndex: 9999, maxHeight: "150px", overFlow: "scroll" }),
        menuList: (provided, state) => ({
            ...provided,
            maxHeight: "150px"
        }),
        control: (base, state) => ({
            ...base,
        })
    }
    const classes = useStyles();
    const [classesData, setClasses] = React.useState([]);
    const [tutorData, setTutor] = React.useState([]);
    const [studentData, setStudent] = React.useState([]);

    

    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const { register, reset, formState: { isValid }, setValue, control, handleSubmit, errors } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });
    const toastOptions = useContext(ToastContext);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data)
        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.id;
            update(data);
        }


    };
    const create = (data) => {
        dispatch(toggle());
        createClass(data).then((res) => {
            toast.success(res.data.message, toastOptions);
            reset({ 'class_name': '','subject_id':"" });
            props.onFormSubmit();
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
        updateSession(data).then((res) => {
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
            setValue('class_id', props.data.class_id, { shouldValidate: true })
            setValue('tutor_id', props.data.tutor_id, { shouldValidate: true })
            setValue('date', props.data.date, { shouldValidate: true })
            setValue('start_time', props.data.start_time, { shouldValidate: true })
            setValue('end_time', props.data.end_time, { shouldValidate: true })

            setValue('student_id', props.data.students, { shouldValidate: true })

            
            setIsAddEdit(true);
        }
    }
    const fetchTutor = () => {
        dispatch(toggle())

        getTutor()
            .then(res => {
                dispatch(toggle())
                setTutor([...res.data.data])

            })
    }

    const fetchStudent = () => {
        dispatch(toggle())

        getStudent()
            .then(res => {
                dispatch(toggle())
                setStudent([...res.data.data])

            })
    }

    
    const fetchClasses = () => {
        dispatch(toggle())

        getClass()
            .then(res => {
                dispatch(toggle())
                setClasses([...res.data.data])

            })
    }
    useEffect(() => {
        fetchClasses()
        fetchTutor()
        fetchStudent()
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
                    <Grid item md={6} xs={12}>
                        <FormControl className={classes.formControl} error={errors.gender ? true : false}>
                            <InputLabel id="demo-simple-select-label">Select Class</InputLabel>
                            <Controller
                                name="class_id"
                                as={<Select
                                    labelId="demo-simple-select-label"
                                    id="class_id"
                                >
                                    {
                                        classesData.map((item, index) => {
                                            return (
                                                <MenuItem value={item.id}>{item.class_name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'required',
                                }}
                            />
                            <FormHelperText error={errors.class_id ? true : false}>{errors.gender ? 'class is required' : null}</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl className={classes.formControl} error={errors.gender ? true : false}>
                            <InputLabel id="demo-simple-select-label">Select Tutor</InputLabel>
                            <Controller
                                name="tutor_id"
                                as={<Select
                                    labelId="demo-simple-select-label"
                                    id="tutor_id"
                                >
                                    {
                                        tutorData.map((item, index) => {
                                            return (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'required',
                                }}
                            />
                            <FormHelperText error={errors.tutor_id ? true : false}>{errors.tutor_id ? 'Tutor is required' : null}</FormHelperText>
                        </FormControl>

                    </Grid>
                   
                    <Grid item md={12} xs={12}>
                    <div>
                    <Controller
                                name="student_id"
                                as={<SelectMat
                                    placeholder={<div>Select Students</div>}
                                    isMulti
                                    styles={customStyles}
                                    label="test"
                                    id="student_id"

                                    options={studentData}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    className="basic-multi-select"
                                    classNamePrefix="select-react"
                                />} control={control}
                                defaultValue="" rules={{
                                    required: 'Required',
                                }}
                            />
                            <span>{errors.student_id ? <span>student is reqiured</span> : null}</span>

                        
                        </div>
                    
                    </Grid>


                    <Grid item md={12} xs={12}>
                        <InputLabel id="demo-simple-select-label">Date</InputLabel>
                        <Controller
                            name="date"
                            as={<TextField
                                type="date"
                                error={errors.date ? true : false}
                                id="date" style={{ width: '100%' }} margin="dense" variant="outlined"
                                helperText={errors.date ? <span>Date  is required</span> : null} />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Required',
                            }}
                        />

                    </Grid>
                    <Grid item md={12} xs={12}>
                        <InputLabel id="demo-simple-select-label">Start Time</InputLabel>

                        <Controller
                            name="start_time"
                            as={<TextField
                                type="time"
                                error={errors.start_time ? true : false}
                                id="start_time" style={{ width: '100%' }} margin="dense" variant="outlined"
                                helperText={errors.start_time ? <span>Start Time is required</span> : null} />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Required',
                            }}
                        />


                    </Grid>
                    <Grid item md={12} xs={12}>
                        <InputLabel id="demo-simple-select-label">End Time</InputLabel>
                        <Controller
                            name="end_time"
                            as={<TextField
                                type="time"
                                error={errors.end_time ? true : false}
                                id="end_time" style={{ width: '100%' }} margin="dense" variant="outlined"
                                helperText={errors.end_time ? <span>End Time  is required</span> : null} />}
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