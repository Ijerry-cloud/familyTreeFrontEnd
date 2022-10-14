import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import useToken from '../../utils/useToken';
import { FIELD_REQUIRED } from "../../utils/form_error_messages";
import { LOGIN_URL } from "../../utils/server_auth_routes";
import { checkObject, isError } from '../../utils/libs/checkObject';
import { useMutation } from 'react-query';
import { postData } from "../../utils/util_query";
import toast from 'react-hot-toast';
import { useHistory } from "react-router";
import { handleApiError } from "../../utils/libs/handleApiError";
import { APP_HOME_PAGE } from "../../utils/app_routes";
import { LoadingButton } from "@mui/lab";


const LoginForm = ({handleChange}) => {

    const paperStyle={padding :20,height:'auto',width:340, margin:"0 auto"}
    const avatarStyle={backgroundColor: blue[500]}
    const btnstyle={margin:'8px 0'}
    const history = useHistory();

    const [state, setState] = useState({
        email: "",
        password: "",
        
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
        uerrors.email = state?.email ? "" : FIELD_REQUIRED;
        uerrors.password = state?.password ? "" : FIELD_REQUIRED;

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


    const mutation = useMutation(postData, {
        onSuccess: (response) => {
            const userObj = response?.data?.data;
            toast.success("You Signed in Successfully");

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
            // if there are errors
            // set to state and terminate
            console.log('check for errors: ', checkErrors);
            setErrors(checkErrors);
            return;
        }


        const data = {
            email : state?.email,
            password: state?.password
        };

        mutation.mutate({
            url: LOGIN_URL,
            payload_data: data
        })

        return
    }

    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { marginY: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField label='Email' placeholder='Enter email' fullWidth required name="email" onChange={handleChange} error={isError(errors?.email)} helperText={errors?.email}/>
                    <TextField label='Password' placeholder='Enter password' type='password' fullWidth required name="password" onChange={handleChange} error={isError(errors?.password)} helperText={errors?.passwprd} />
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember me"
                    />
                    <LoadingButton
                            loading={mutation?.isLoading}
                            loadingPosition="end"
                            endIcon={<LoginIcon />}
                            sx={btnstyle}
                            variant="contained"
                            fullWidth
                            color="primary"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Sign In
                    </LoadingButton>
                </Box>
                <Typography >
                     <Link to="#">
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link to="#" onClick={()=>handleChange("event",1)} >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default LoginForm;