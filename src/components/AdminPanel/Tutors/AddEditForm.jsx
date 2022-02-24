import React, { useEffect,useContext } from 'react';
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
import { getSubject ,addTutor,updateTutor} from '../../../api/api';
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
    const { control, handleSubmit, setValue, reset, errors } = useForm();
    const [subjects, setSubjects] = React.useState([]);
    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const toastOptions = useContext(ToastContext);
    const dispatch = useDispatch();
    useEffect(() => {
        subject();
        if (props.data)
        addEditMode(props.data)
       
    }, []);
    const addEditMode = (data) => {
        if (data) {
            setValue('name', props.data.user_name, { shouldValidate: true })
            setValue('father_name', props.data.father_name, { shouldValidate: true })
            setValue('phone_no', props.data.phone_no, { shouldValidate: true })
            setValue('father_name', props.data.father_name, { shouldValidate: true })
            setValue('address', props.data.address, { shouldValidate: true })
            setValue('age', props.data.age, { shouldValidate: true })
            setValue('is_active', props.data.is_active, { shouldValidate: true })
            setValue('experience', props.data.experience, { shouldValidate: true })
            setValue('email', props.data.email, { shouldValidate: true })
            setValue('subjects_id', props.data.subjects, { shouldValidate: true })
            setValue('joining_date', props.data.joining_date, { shouldValidate: true })
            
            
            setIsAddEdit(true);
        }
    }
    const subject = () => {
        getSubject()
            .then(res => {
                console.log(res);
                setSubjects([...res.data.data])
            })
            .catch(error => {
                console.log(error);
            })
    }

    const onSubmit = (data) => {
       
        if (!isAddEdit)
            create(data);
        else {
            data.id = props.data.user_id;
            update(data);
        }


    }
    const create = (data) => {
        dispatch(toggle());
        addTutor(data).then((res) => {
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

        dispatch(toggle());
        updateTutor(data).then((res) => {
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


    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <Controller
                            name="name"
                            as={<TextField id="name"
                                fullWidth label="Name" error={errors.name ? true : false}
                                helperText={errors.name ? <span>Name is reqiured</span> : null}
                            />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Controller
                            name="father_name"
                            as={<TextField id="father_name" fullWidth
                                error={errors.father_name ? true : false}
                                helperText={errors.father_name ? <span>Father Name is reqiured</span> : null}
                                label="Father Name" />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Controller
                            name="phone_no"
                            as={<TextField id="phone_no" fullWidth
                                error={errors.phone_no ? true : false}
                                helperText={errors.phone_no ? <span>Contact Number is reqiured</span> : null}
                                label="Contact Number" />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Controller
                            name="address"
                            as={<TextField id="address" fullWidth
                                error={errors.address ? true : false}
                                helperText={errors.address ? <span>Address is reqiured</span> : null}
                                label="Address" />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <InputLabel id="demo-simple-select-label">Joining Date</InputLabel>
                        <Controller
                            name="joining_date"
                            as={<TextField id="joining_date" type="date"
                                error={errors.joining_date ? true : false}
                                helperText={errors.joining_date ? <span>Joining Date is reqiured</span> : null}
                                fullWidth />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Controller
                            name="age"
                            as={<TextField id="age" type="number"
                                label={'Age'}
                                error={errors.age ? true : false}
                                helperText={errors.age ? <span>Age is reqiured</span> : null}
                                fullWidth />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                            }}
                        />
                    </Grid>
                    
                    <Grid item md={6} xs={12}>
                        <FormControl className={classes.formControl} error={errors.is_active ? true : false}>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Controller
                                name="is_active"
                                as={<Select
                                    labelId="demo-simple-select-label"
                                    id="is_active"
                                >
                                    <MenuItem value='1'>Active</MenuItem>
                                    <MenuItem value='0'>In-Active</MenuItem>
                                </Select>}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'required',
                                }}
                            />
                            <FormHelperText error={errors.is_active ? true : false}>{errors.is_active ? 'Status is required' : null}</FormHelperText>
                        </FormControl>
                    </Grid>
                 {
                     isAddEdit ? null :  
                 
                    <Grid item md={6} xs={12}>
                        <FormControl className={classes.formControl} error={errors.gender ? true : false}>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Controller
                                name="gender"
                                as={<Select
                                    labelId="demo-simple-select-label"
                                    id="gender"
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value='female'>Female</MenuItem>
                                </Select>}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'required',
                                }}
                            />
                            <FormHelperText error={errors.gender ? true : false}>{errors.gender ? 'Gender is required' : null}</FormHelperText>
                        </FormControl>
                    </Grid>
                 }
                {
                     isAddEdit ?   
                     <Grid item md={6} xs={12}>
                        <FormControl className={classes.formControl} error={errors.experience ? true : false}>
                            <InputLabel id="demo-simple-select-label">Experience</InputLabel>
                            <Controller
                                name="experience"
                                as={<Select
                                    labelId="demo-simple-select-label"
                                    id="experience"
                                >
                                    <MenuItem value={'beginner'}>Beginner</MenuItem>
                                    <MenuItem value={'intermediate'}>Intermediate</MenuItem>
                                    <MenuItem value={'professional'}>Professional</MenuItem>

                                </Select>}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'required',
                                }}
                            />
                            <FormHelperText error={errors.experience ? true : false}>{errors.experience ? 'Gender is required' : null}</FormHelperText>
                        </FormControl>
                    </Grid>
                    :
                    <Grid item md={12} xs={12}>

                        <FormControl className={classes.formControl} error={errors.experience ? true : false}>
                            <InputLabel id="demo-simple-select-label">Experience</InputLabel>
                            <Controller
                                name="experience"
                                as={<Select
                                    labelId="demo-simple-select-label"
                                    id="experience"
                                >
                                    <MenuItem value={'beginner'}>Beginner</MenuItem>
                                    <MenuItem value={'intermediate'}>Intermediate</MenuItem>
                                    <MenuItem value={'professional'}>Professional</MenuItem>

                                </Select>}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'required',
                                }}
                            />
                            <FormHelperText error={errors.experience ? true : false}>{errors.experience ? 'Gender is required' : null}</FormHelperText>
                        </FormControl>
                    </Grid>
                    }
                    {
                     isAddEdit ?   
                     <Grid item md={12} xs={12}> 
                      <Controller
                            name="email"
                            as={<TextField

                                id="email"

                                error={errors.email ? true : false}
                                helperText={errors.email ? <span>Email is reqiured & Must be Valid Email</span> : null}
                                fullWidth
                                label='Email'
                            />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

                            }}
                        />
                    </Grid>
                     :   
                     <Grid item md={6} xs={12}>
                          <Controller
                            name="email"
                            as={<TextField

                                id="email"

                                error={errors.email ? true : false}
                                helperText={errors.email ? <span>Email is reqiured & Must be Valid Email</span> : null}
                                fullWidth
                                label='Email'
                            />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required',
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

                            }}
                        />
                    </Grid>
                    }
                       
                    {
                     isAddEdit ? null : 
                    <Grid item md={6} xs={12}>
                        <Controller
                            name="password"
                            as={<TextField
                                id="password"
                                error={errors.password ? true : false}
                                helperText={errors.password ? <span>Password is reqiured </span> : null}
                                fullWidth
                                label='Password'
                            />}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'required'
                            }}
                        />
                    </Grid>
                    }
                    <Grid item md={12} xs={12}>
                        <div style={{ zIndex: 1000 }}>
                            <Controller
                                name="subjects_id"
                                as={<SelectMat
                                    placeholder={<div>Select Subjects </div>}
                                    isMulti
                                    styles={customStyles}
                                    id="subjects_id"
                                    options={subjects}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    className="basic-multi-select"
                                    classNamePrefix="select-react"
                                />}
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'required'
                                }}
                            />
                            <FormHelperText error={errors.subjects_id ? true : false}>{errors.subjects_id ? 'Subjects  is required' : null}</FormHelperText>
                        </div>
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <div style={{ textAlign: "right" }}>

                            <Button color="primary" type="submit">
                                Submit
                                </Button>

                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>

    );
}