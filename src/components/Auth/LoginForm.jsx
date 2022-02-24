import React, { useContext } from 'react'
import FormTitle from './FormTitle';
import { Box, Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './style.css'
import Label from './label';
import { NavLink } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { login } from '../../api/api';
import { toast } from 'react-toastify';
import ToastContext from '../../context/ToastContext';
import { useHistory } from 'react-router-dom';

export default function LoginForm() {
    const history = useHistory();

    const { reset, formState: { isValid, errors }, control, handleSubmit } = useForm({
        mode: "all",
        reValidateMode: "all",
        shouldUnregister: true
    });

    const toastOptions = useContext(ToastContext);

    const onSubmit = (data) => {
        console.log(data)
        login(data)
            .then(res => {
                toast.success(res.data.message, toastOptions)
                console.log(res);
                localStorage.setItem('user_auth_config', JSON.stringify({ token: res.data.token, user: res.data.user }))
                history.push('/v1');
            })
            .catch(err => {
                toast.error(err.response.data.error, toastOptions)
                console.log(err);
            })
    }
    return (
        <div className="form__wrapper">
            <div className="form">
                <NavLink to={"/landing"}>
                <FormTitle title="Login" />

                </NavLink>

                <Box component="div" className="form__group">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="input__field_block">
                            <Label name="Username*" />
                            {/* <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                // rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }}
                                render={({ field }) => <TextField {...field}
                                    error={errors.email ? true : false} type="email"
                                    style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.email ? <span>Email is Required & Must be Valid Email</span> : null}
                                />}
                            /> */}
                            <Controller
                    name="email"
                    as={<TextField
                        variant="outlined"
                        id="email"
                        margin="normal"
                        error={errors.email ? true : false}
                        helperText={errors.email ? <span>Email is reqiured & Must be Valid Email</span> : null}
                        fullWidth
                        label='email'
                        autoComplete="email"
                        autoFocus
                    />}
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'required',
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

                    }}
                />
                        </div>
                        <div className="input__field_block">
                            <Label name="Password" />
                            {/* <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                // rules={{ required: true }}
                                render={({ field }) => <TextField {...field}
                                    type="password"
                                    error={errors.password ? true : false}
                                    style={{ width: '100%' }} margin="dense" variant="outlined"
                                    helperText={errors.password ? <span>Password is Required</span> : null}
                                />}
                            /> */}
                               <Controller
                    name="password"
                    as={<TextField
                        variant="outlined"
                        margin="normal"
                        error={errors.password ? true : false}
                        helperText={errors.password ? <span>Paaword is reqiured</span> : null}
                        fullWidth
                        label='password'
                        type="password"
                        id="password"
                        
                        
                        autoComplete="current-password"
                    />}
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'required',
                    }}
                />
                        </div>
                        <FormControlLabel
                            control={<Checkbox name="checkedB" />}
                            label="Remember Me"
                        />
                        <div className="submission_block">

                            <Button type="submit"  variant="contained" className="submission__button">
                                Sign In
                              </Button>

                            <Box component="div" component={Link} to="/register">
                                <p className="sign__in__parass text-center">Don't have an Account, <span className="content__prompt">Sign Up?</span></p>
                            </Box>

                        </div>

                    </form>
                </Box>
            </div>
        </div>

    )
}
