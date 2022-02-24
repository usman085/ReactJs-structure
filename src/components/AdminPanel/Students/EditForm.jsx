import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from "react-hook-form";
import SelectMat from 'react-select';
import { useHistory } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getClass, updateStudent } from '../../../api/api';

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
    const [isAddEdit, setIsAddEdit] = React.useState(false);
    const customStyles = {
        menu: provided => ({ ...provided, zIndex: 9999, maxHeight: "150px", overFlow: "scroll" }),
        menuList: (provided, state) => ({
            ...provided,
            // zIndex: 9999999,
            // overflow: "scroll",
            // height:"30px !important"
            maxHeight: "150px"
            // background: 'blue',


        }),
        control: (base, state) => ({
            ...base,

            // state.isFocused can display different borderColor if you need it

            // overwrittes hover style


        })
    }
    useEffect(() => {
        getClasses()
        if (props.data)
            console.log(props.data, "data")
        addEditMode(props.data)

    }, []);
    const addEditMode = (data) => {
        if (data) {
            setValue('name', props.data.name, { shouldValidate: true })
            setValue('father_name', props.data.father_name, { shouldValidate: true })
            setValue('phone_no', props.data.phone_no, { shouldValidate: true })
            setValue('father_name', props.data.father_name, { shouldValidate: true })
            setValue('address', props.data.address, { shouldValidate: true })
            setValue('age', props.data.age, { shouldValidate: true })
            setValue('is_active', props.data.is_active, { shouldValidate: true })
            setValue('gender', props.data.gender, { shouldValidate: true })
            setValue('email', props.data.email, { shouldValidate: true })
            setValue('class_id', props.data.class_id, { shouldValidate: true })
            setValue('date_of_birth', new Date(props.data.date_of_birth).toISOString().slice(0, 10), { shouldValidate: true })
            setValue('is_active', props.data.is_active, { shouldValidate: true })

            setIsAddEdit(true);
        }
    }
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
    const onSubmitStudent = (data) => {
        data.id = props.data.id
        updateStudent(data)
            .then(res => {
                props.onFormSubmit()
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    const classes = useStyles();
    const { control, handleSubmit, setValue, reset, errors } = useForm();
    return (
        <div className={classes.root}>
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
                            <FormHelperText error={errors.gender ? true : false}>{errors.gender ? 'Gender is required' : null}</FormHelperText>
                        </FormControl>
                        {/* <div style={{ zIndex: 1000, marginTop: 13 }}>
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
                                        </div> */}
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