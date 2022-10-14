import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import AvatarUpload from '../UComponents/AvatarUpload';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import useToken from '../../utils/useToken';
import { useQuery } from 'react-query';
import { GET_UPDATE_PROFILE_URL } from '../../utils/server_auth_routes';
import { fetchData } from '../../utils/util_query';
import { handleApiError } from '../../utils/libs/handleApiError';
import ULoadingComponent from '../UComponents/ULoadingComponent';
import UErrorComponent from '../UComponents/UErrorComponent';
import { FIELD_REQUIRED } from '../../utils/form_error_messages';
import { LoadingButton } from '@mui/lab';
import { checkObject, isError as uCheckError } from '../../utils/libs/checkObject';
import { postData } from '../../utils/util_query';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { uFormatDate } from '../../utils/libs/formatDate';



/**
 * 
 * url: {base_url}/core/user_profile/
 * method: POST
 * 
 * payload: {
 *  first_name: "",
 *  middle_name: "",
 *  last_name: "",
 *  date_of_birth: "",
 *  hobbies: "",
 *  gender: "",
 *  image_64: ""
 * }
 * 
 * 
 */

const Gender = [
    {
        label: "Male",
        value: "Male"
    },
    {
        label: "Female",
        value: "Female"
    }
]


export default function EditProfileComponent(){

    
    const {token} = useToken();

    // call the api that loads this data only once
    let payload_data = {
    };
    let profile = {};
    const result = useQuery(['profile', { url: GET_UPDATE_PROFILE_URL, payload_data, authenticate:true, token }], fetchData, {
        retry:false,
        onSuccess: (data) => {
            console.log("successfult");
            console.log("data: ", data);
            profile = data?.data?.data;
            console.log("gender is ", profile?.gender);
            setState({
                ...state,
                firstName: profile?.first_name,
                middleName: profile?.middle_name,
                lastName: profile?.last_name,
                gender: profile?.gender,
                image: profile?.image,
                dob: profile?.date_of_birth,
                hobbies: profile?.hobbies
            })
        }
    });
    const {  isLoading, isError, data, error, isFetching } = result;
    

    const today = new Date();


    const [image, setImage] = useState({
        url: null,
        base64FileString: null
    });
    const [state, setState] = useState({
        firstName: profile?.first_name,
        middleName: profile?.middle_name,
        lastName: profile?.last_name,
        gender: profile?.gender ?? "",
        image: profile?.image,
        dob: profile?.date_of_birth,
        hobbies: profile?.hobbies
    });
    const [errors, setErrors] = useState({});

    // if (profile && !(state?.dob)){
    //     setState({
    //         ...state,
    //         firstName: profile?.first_name ?? "",
    //         lastName: profile?.last_name ?? "",
    //         middleName: profile?.middle_name ?? " ",
    //         gender: profile?.gender ?? "",
    //         hobbies: profile?.hobbies ?? "",
    //         dob: profile?.date_of_birth ?? ""
    //     });
    // }

    function handleImage(url, base64FileString, type){
        if (type){
            setImage({
                url: url,
                base64FileString: base64FileString
            });
            return;
        }
        return;
    }

    const handleChange = (evt) => {

        console.log("handling change", evt.target.name, evt.target.value);
        console.log(state?.firstName);
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
        console.log("state after set: ", state);
        return;
    }


    /**
     * function to validate my form
     *
     * @param null
     * @returns object
     */
     const validate = () => {
        let uerrors = {}
        uerrors.firstName = state?.firstName ? "" : FIELD_REQUIRED;
        uerrors.lastName = state?.lastName ? "" : FIELD_REQUIRED;
        uerrors.gender = state?.gender ? "" : FIELD_REQUIRED;
        uerrors.dob = state?.dob ? "" : FIELD_REQUIRED;
        
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
  
        const udob = uFormatDate((state?.dob ? state?.dob : profile?.date_of_birth));

        console.log("b4: ", image);

        const payload_data = {
          first_name: state?.firstName ? state?.firstName : profile?.first_name,
          middle_name: state?.middleName ? state?.middleName : profile?.middle_name,
          last_name: state?.lastName ? state?.lastName : profile?.last_name,
          date_of_birth: udob,
          hobbies: state?.hobbies ? state?.hobbies : profile?.hobbies,
          image: image?.base64FileString ?? null,
          gender: state?.gender ? state?.gender : profile?.gender
        };

        
        mutation.mutate({
            url: GET_UPDATE_PROFILE_URL,
            authenticate: true,
            token,
            payload_data
        })
  
        return
  
      }

    if (isLoading){
        return (
            <ULoadingComponent />
        )
    }

    if (isError){
        return (
            <UErrorComponent />
        );
    }

    

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper elevation={1}>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container>
                    <Grid item xs={12} m={1}>
                        <AvatarUpload handleImage={handleImage} url={profile?.image} />                
                    </Grid>
                    <Grid item xs={12} m={1}>
                        <TextField id="firstName" InputLabelProps={{ shrink: true }} label="first name" variant="outlined" name="firstName" value={state?.firstName} onChange={handleChange} error={uCheckError(errors?.firstName)} helperText={errors?.firstName}  required/>
                        <TextField id="middleName" InputLabelProps={{ shrink: true }} label="middle name" variant="outlined" name="middleName" onChange={handleChange} error={uCheckError(errors?.middleName)} helperText={errors?.middleName} value={state?.middleName} />
                        <TextField id="lastName" InputLabelProps={{ shrink: true }} label="last name" variant="outlined" name="lastName" required onChange={handleChange} error={uCheckError(errors?.lastName)} helperText={errors?.lastName} value={state?.lastName} />
                    </Grid>
                    <Grid item xs={12} m={1}>
                        <TextField
                            id="gender"
                            select
                            label="Select Gender"
                            required
                            InputLabelProps={{ shrink: true }}
                            value={state?.gender}
                            onChange={handleChange}
                            error={uCheckError(errors?.gender)}
                            helperText={errors?.gender}
                        >
                            {Gender.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <MobileDatePicker
                            label="Date of Birth"
                            value={state?.dob}
                            onChange={(newValue) => {
                                setState({
                                    ...state,
                                    dob: newValue
                                });
                            }}
                            InputLabelProps={{ shrink: true }}
                            renderInput={(params) => <TextField {...params} />}
                            maxDate={today}
                        />
                        <TextField
                            id="hobbies"
                            label="Hobbies"
                            InputLabelProps={{ shrink: true }}
                            value={state?.hobbies}
                            name="hobbies"
                            onChange={handleChange}
                            multiline
                            rows={3}
                            error={uCheckError(errors?.hobbies)}
                            helperText={errors?.hobbies}
                        />
                    </Grid>
                    
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
                </Grid>
            </Box>
        </Paper>
      </LocalizationProvider>
    );
}