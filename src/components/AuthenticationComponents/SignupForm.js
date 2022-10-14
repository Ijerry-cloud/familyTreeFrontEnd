import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Avatar from '@mui/material/Avatar';
import { TextField } from "@mui/material";
import { blue } from '@mui/material/colors';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { uFormatDate } from "../../utils/libs/formatDate";
import { FIELD_REQUIRED, PASSWORD_MISMATCH } from "../../utils/form_error_messages";
import { checkObject, isError } from '../../utils/libs/checkObject';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { SIGNUP_URL } from '../../utils/server_auth_routes';
import { postData } from "../../utils/util_query";
import { handleApiError } from "../../utils/libs/handleApiError";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useHistory } from "react-router-dom";
import { APP_HOME_PAGE } from "../../utils/app_routes";
import useToken from "../../utils/useToken";

/**
 * 
 * payload for signup
 * {
            "first_name": "", *
            "last_name": "", *
            "password": "", *
            "email": "", *
            "date_of_birth": "", *
            "gender": "", *
        }
 * 
 * @returns 
 */


const SignupForm = () => {
    const paperStyle = { padding: 20, width: 340, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: blue[500] }
    const marginTop = { marginTop: 5 }
    const history = useHistory();


    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        dateOfBirth: uFormatDate(new Date('2014-08-18T21:11:54')),
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const {token, setToken} = useToken();

    /**
     * function to validate my form
     *
     * @param null
     * @returns object
     */
    function validate() {
        let uerrors = {}
        uerrors.firstName = state?.firstName ? "" : FIELD_REQUIRED;
        uerrors.lastName = state?.lastName ? "" : FIELD_REQUIRED;
        uerrors.gender = state?.gender ? "" : FIELD_REQUIRED;
        uerrors.email = state?.email ? "" : FIELD_REQUIRED;
        uerrors.dateOfBirth = state?.dateOfBirth ? "" : FIELD_REQUIRED;
        uerrors.password = state?.password ? "" : FIELD_REQUIRED;
        uerrors.confirmPassword = state?.confirmPassword ? "" : FIELD_REQUIRED;

        if (state?.password && state?.confirmPassword) {
            uerrors.password = state?.password == state?.confirmPassword ? "" : PASSWORD_MISMATCH;
        }

        return uerrors;
    }


    function handleChange(evt) {

        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
        return;
    }

    function handleDateChange(dateParam) {
        let formattedDate = uFormatDate(dateParam);

        setState({
            ...state,
            dateOfBirth: formattedDate
        });

        return;
    }


    const mutation = useMutation(postData, {
        onSuccess: (response) => {
            console.log("d: ", response);
            const userObj = response?.data?.data;
            toast.success("You Signed up Successfully");

            // write token to local storage
            setToken(userObj);

            // navigate to the dashboard
            history.push(APP_HOME_PAGE);
        },
        onError: (error, variables, context) => {
            handleApiError(error);
        }
    });

    function handleSubmit(evt) {
        // prevent default form submission
        evt.preventDefault();
        let checkErrors = validate();
        let areAllFieldsFalse = checkObject(checkErrors);

        if (!areAllFieldsFalse) {
            console.log("there are errors", checkErrors);
            // if there are errors
            // set to state and terminate
            setErrors(checkErrors);
            return;
        }


        const data = {
            first_name: state?.firstName,
            last_name: state?.lastName,
            password: state?.password,
            email: state?.email,
            date_of_birth: state?.dateOfBirth,
            gender: state?.gender,
        };

        mutation.mutate({
            url: SIGNUP_URL,
            payload_data: data
        })

        return
    }



    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid>
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <AddCircleOutlineOutlinedIcon />
                        </Avatar>
                        <h2 style={headerStyle}>Sign Up</h2>
                        <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                    </Grid>

                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { marginY: .5 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField fullWidth label='FirstName' required placeholder="Enter your First Name" name="firstName" value={state?.firstName} onChange={handleChange} error={isError(errors?.firstName)} helperText={errors?.firstName} />
                        <TextField fullWidth label='LastName' required placeholder="Enter your Last Name" name="lastName" value={state?.lastName} onChange={handleChange} error={isError(errors?.lastName)} helperText={errors?.lastName} />
                        <TextField fullWidth label='Email' required placeholder="Enter your email" name="email" value={state?.email} onChange={handleChange} error={isError(errors?.email)} helperText={errors?.email} />
                        <FormControl component="fieldset" style={marginTop} error={isError(errors?.gender)} >
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup required aria-label="gender" name="gender" style={{ display: 'initial' }} onChange={handleChange} value={state.gender}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                        <MobileDatePicker
                            required
                            label="Date of Birth"
                            inputFormat="MM/dd/yyyy"
                            value={uFormatDate(state?.dateOfBirth)}
                            onChange={handleDateChange}
                            name="dateOfBirth"
                            renderInput={(params) => <TextField {...params} error={isError(errors?.dateOfBirth)} helperText={errors?.dateOfBirth} />}
                        />
                        <TextField required fullWidth label='Password' placeholder="Enter your password" name="password" value={state?.password} onChange={handleChange} error={isError(errors?.password)} helperText={errors?.password} />
                        <TextField required fullWidth label='Confirm Password' placeholder="Confirm your password" name="confirmPassword" value={state?.confirmPassword} onChange={handleChange} error={isError(errors?.confirmPassword)} helperText={errors?.confirmPassword} />
                        <FormControlLabel
                            control={<Checkbox name="checkedA" />}
                            label="I accept the terms and conditions."
                        />
                        <LoadingButton
                            loading={mutation?.isLoading}
                            loadingPosition="end"
                            endIcon={mutation?.isLoading ? <SaveIcon /> : <AddCircleOutlineOutlinedIcon />}
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </LoadingButton>
                    </Box>
                </Paper>
            </Grid>
        </LocalizationProvider>
    )
}

export default SignupForm;


