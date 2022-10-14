import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoadingButton from '@mui/lab/LoadingButton';
import { postData } from "../../utils/util_query";
import { handleApiError } from "../../utils/libs/handleApiError";
import { useMutation } from 'react-query';
import { FIELD_REQUIRED, PASSWORD_MISMATCH } from "../../utils/form_error_messages";
import { checkObject, isError } from '../../utils/libs/checkObject';
import { CHANGE_PASSWORD_URL } from '../../utils/server_auth_routes';
import useToken from '../../utils/useToken';
import toast from 'react-hot-toast';


/**
 * 
 * url: CHANGE_PASSWORD
 * payload:
 * {
 *    old_password: "",
 *    new_password: "",
 *    confirm_password: ""
 * }
 * 
 */

export default function ChangePasswordForm(){

    const {token} = useToken();
    // handle states for password visibility
    const [passwordVisibility, setPasswordVisibility] = useState({
                                                          oldPassword: false,
                                                          newPassword: false,
                                                          confirmPassword: false
                                                          });
                                         
    // handle state for my error messages
    const [errors, setErrors] = useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    const [state, setState] = useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    /**
     * handle state management of each password field
     * to determine fields to show, and not to show
     * 
     * @param string
     * @returns 
     */                                                          
    const handleVisibilityChange = (prop) => (event) => {
      setPasswordVisibility({
        ...passwordVisibility,
        [prop]: !passwordVisibility[prop]
      });
    };


    /**
     * function to validate my form
     *
     * @param null
     * @returns object
     */
     const validate = () => {
        let uerrors = {}
        uerrors.oldPassword = state?.oldPassword ? "" : FIELD_REQUIRED;
        uerrors.newPassword = state?.newPassword ? "" : FIELD_REQUIRED;
        uerrors.confirmPassword = state?.confirmPassword ? "" : FIELD_REQUIRED;
        
        if (state?.newPassword && state?.confirmPassword) {
            uerrors.newPassword = state?.newPassword == state?.confirmPassword ? "" : PASSWORD_MISMATCH;
            uerrors.confirmPassword = state?.newPassword == state?.confirmPassword ? "" : PASSWORD_MISMATCH;
        }

        return uerrors;
  }

    const mutation = useMutation(postData, {
      onSuccess: (response) => {
          console.log("d: ", response);
          const message = response?.data?.message;
          toast.success(message);
      },
      onError: (error, variables, context) => {
          handleApiError(error);
      }
  });


  const handleChange = (evt) => {

    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
    return;
  }

    const handleSubmit = (e) => {
      e.preventDefault();
      let checkErrors = validate();
      let areAllFieldsFalse = checkObject(checkErrors);

      if (!areAllFieldsFalse) {
          console.log("there are errors", checkErrors);
          // if there are errors
          // set to state and terminate
          setErrors(checkErrors);
          return;
      }

      const payload_data = {
        old_password: state?.oldPassword,
        new_password: state?.newPassword,
        confirm_password: state?.confirmPassword
      };

      mutation.mutate({
          url: CHANGE_PASSWORD_URL,
          authenticate: true,
          token,
          payload_data
      })

      return

    }

    return (
        <Paper elevation={1} >
            <Box
                 component="form"
                 sx={{
                   '& .MuiTextField-root': { m: 1},
                 }}
                 noValidate
                 autoComplete="off"
            >
                <Grid container>
                    <Stack sx={{width: "90%", margin: "1% auto"}}>
                        <TextField
                            id="outlined-password-input"
                            label="Old Password"
                            type={passwordVisibility?.oldPassword ? "text" : "password"}
                            fullWidth
                            autoComplete="current-password"
                            name="oldPassword"
                            value={state?.oldPassword}
                            onChange={handleChange}
                            error={isError(errors?.oldPassword)}
                            helperText={errors?.oldPassword}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end" onClick={handleVisibilityChange("oldPassword")}>
                                    { passwordVisibility?.oldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />  } 
                                  </InputAdornment>
                                ),
                              }}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="New Password"
                            type={passwordVisibility?.newPassword ? "text" : "password"}
                            fullWidth
                            autoComplete="current-password"
                            name="newPassword"
                            value={state?.newPassword}
                            onChange={handleChange}
                            error={isError(errors?.newPassword)}
                            helperText={errors?.newPassword}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end" onClick={handleVisibilityChange("newPassword")}>
                                    { passwordVisibility?.newPassword ? <VisibilityOffIcon /> : <VisibilityIcon />  } 
                                  </InputAdornment>
                                ),
                              }}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Confirm Password"
                            type={passwordVisibility?.confirmPassword ? "text" : "password"}
                            fullWidth
                            autoComplete="current-password"
                            name="confirmPassword"
                            value={state?.confirmPassword}
                            onChange={handleChange}
                            error={isError(errors?.confirmPassword)}
                            helperText={errors?.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end" onClick={handleVisibilityChange("confirmPassword")}>
                                    { passwordVisibility?.confirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />  } 
                                  </InputAdornment>
                                ),
                              }}
                        />                    
                        <LoadingButton
                          sx={{margin: 1}}
                          loading={mutation?.isLoading}
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Submit
                        </LoadingButton>
                    </Stack>
                </Grid>
            </Box>
        </Paper>
    )
}