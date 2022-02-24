import React, { useEffect } from 'react'
import FormTitle from './FormTitle';
import { Box, Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './style.css'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Label from './label';
import { NavLink,useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
import SelectMat from 'react-select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { getClass, addStudent, getSubject, addTutor } from '../../api/api';
import { toast } from 'react-toastify';
import ToastContext from '../../context/ToastContext';
import { toggle } from '../../actions/pacerActions.js';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    formControl: {
        //   margin: theme.spacing(1),
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}
export default function RegisterForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const toastOptions = React.useContext(ToastContext);
    let history = useHistory();

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
    useEffect(() => {
        subject();
        getClasses();

    }, []);
    const [value, setValue] = React.useState(0);
    const { control, handleSubmit, reset, errors } = useForm();
    const [subjects, setSubjects] = React.useState([]);
    const [classesData, setClassesData] = React.useState([]);



    const getClasses = () => {
        getClass()
            .then(res => {
                console.log(res);
                setClassesData([...res.data.data])
            })
            .catch(error => {
                console.log(error);
            })
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


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onSubmitStudent = (data) => {
        console.log(data);
        addStudent(data)
            .then(res =>{   history.push("/login"); console.log(res)})
            .catch(err => console.log(err))
    }

    const onSubmitTutor = (data) => {
        console.log(data);
        dispatch(toggle())
        addTutor(data)
            .then(res => {
                history.push("/login"); 
                console.log(res)
                dispatch(toggle())
                toast.success(res.data.message, toastOptions)
                reset({ 'class_name': '', 'subject_id': "" });

            })
            .catch(err => {
                dispatch(toggle())
                toast.success(err.response.data.error, toastOptions)

                console.log(err);
            })
    }

    return (
        <div className="form__wrapper" >
            <div className="" style={{ padding: 10, background: "#fff" }}>

                <FormTitle title="Register" />

                <Box component="div" className="form__group">
                    <div className={classes.root}>
                        <AppBar position="static" color="primary">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                            >
                                <Tab label="Student" style={{ color: "#fff" }} {...a11yProps(0)} />
                                <Tab label="Tutor" style={{ color: "#fff" }} {...a11yProps(1)} />

                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>

                            <form className={classes.root} onSubmit={handleSubmit(onSubmitStudent)} noValidate autoComplete="off">
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
                                        <InputLabel id="demo-simple-select-label">Date of Birth</InputLabel>
                                        <Controller
                                            name="date_of_birth"
                                            as={<TextField id="date_of_birth" type="date"
                                                error={errors.date_of_birth ? true : false}
                                                helperText={errors.date_of_birth ? <span>Birth Date is reqiured</span> : null}
                                                fullWidth />}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'required',
                                            }}
                                        />
                                    </Grid>


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


                                    <Grid item md={12} xs={12}>
                                        <div style={{ zIndex: 1000, marginTop: 13 }}>
                                            <Controller
                                                name="class_id"
                                                as={<SelectMat
                                                    placeholder={<div>Select Class </div>}

                                                    styles={customStyles}
                                                    id="class_id"
                                                    options={classesData}
                                                    getOptionLabel={(option) => option.class_name}
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

                                    <Grid item md={12} xs={12}>
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


                                    <Grid item md={12} xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox name="checkedB" />}
                                            label="I agree with T&C"
                                        />
                                        <div className="submission_block">
                                            <Button variant="contained" type='submit' className="submission__button">
                                                Sign Up
                                            </Button>
                                            <Box component="div" component={Link} to="/login">
                                                <p className="sign__in__parass text-center">Already have an Account, <span className="content__prompt">Sign In</span></p>
                                            </Box>
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <form className={classes.root} onSubmit={handleSubmit(onSubmitTutor)} noValidate autoComplete="off">
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
                                        <FormControlLabel
                                            control={<Checkbox name="checkedB" />}
                                            label="I agree with T&C"
                                        />
                                        <div className="submission_block">

                                            <Button variant="contained" type="submit" className="submission__button">
                                                Sign Up
                                            </Button>

                                            <Box component="div" component={Link} to="/login">
                                                <p className="sign__in__parass text-center">Already have an Account, <span className="content__prompt">Sign In</span></p>
                                            </Box>
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        </TabPanel>

                    </div>

                </Box>
            </div>
        </div>

    )
}
