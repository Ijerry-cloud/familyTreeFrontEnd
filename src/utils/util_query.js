import toast from 'react-hot-toast';
import axios from 'axios';
import { clockPickerClasses } from '@mui/lab';


export const fetchData = async ({queryKey}) => {
    // a hook that fetches data
    const [_key, {payload_data, url, authenticate, token}] = queryKey;
    console.log("p: ", payload_data, "u: ", url, "t: ", token, "a: ", authenticate);
  
    // // check network connection strength
    // let is_connected = await netInfoNetworkCheck();
    // if (!is_connected){
    //   return toast.error("Could not detect an active network connection");
    // }
  
      // add authorization token from state
      // get access token for this user
      const config = {};

      // add authorization token to headers for api call
      if (authenticate){
        // if theres is no registered access token
        if (!(token?.token)){
            toast.error("you are not authenticated, please try logging in again");
            return;
        }  
        
        console.log("my token is : ", token?.token);
        const authorization = { Authorization : `Bearer ${token?.token}` }
        config.headers = authorization;
      }
    console.log("config: ", config);
    let response_data = await axios.get(url, config);
  
    return response_data;
  }
  
  
  export const postData = async (data) => {
    // a hook that fetches data
    console.log("data: ", data);
    const {payload_data, url, authenticate, token} = data;
    console.log("pstea: ", payload_data, "u: ", url);
  
      // check network connection strength
    //   let is_connected = await netInfoNetworkCheck();
    //   if (!is_connected){
    //     return toast.error("Could not detect an active network connection");
    //   }
      
     const config = {};

      // add authorization token to headers for api call
      if (authenticate){
        // if theres is no registered access token
        if (!(token?.token)){
            toast.error("you are not authenticated, please try logging in again");
            return;
        }  
        

        const authorization = { Authorization : `Bearer ${token?.token}` }
        config.headers = authorization;
      }
      
    let response_data = await axios.post(url, payload_data, config);
  
    return response_data;
  }

  export const searchData = async (query_param) => {
    // a hook that searches data
    const {payload_data, url, authenticate, token} = query_param;
    console.log("p: ", payload_data, "u: ", url, "t: ", token, "a: ", authenticate);
  
      // add authorization token from state
      // get access token for this user
      const config = {};

      // add authorization token to headers for api call
      if (authenticate){
        // if theres is no registered access token
        if (!(token?.token)){
            toast.error("you are not authenticated, please try logging in again");
            return;
        }  
        
        console.log("my token is : ", token?.token);
        const authorization = { Authorization : `Bearer ${token?.token}` }
        config.headers = authorization;
        config.params = payload_data
      }
    console.log("config: ", config);
    let response_data = await axios.get(url, config);
  
    return response_data;
  }

  export const eventsGetData = async ({queryKey}) => {
    // a hook that searches data
    const [_key, {payload_data, url, authenticate, token}] = queryKey;
    console.log("p: ", payload_data, "u: ", url, "t: ", token, "a: ", authenticate);
  
      // add authorization token from state
      // get access token for this user
      const config = {};

      // add authorization token to headers for api call
      if (authenticate){
        // if theres is no registered access token
        if (!(token?.token)){
            toast.error("you are not authenticated, please try logging in again");
            return;
        }  
        
        console.log("my token is : ", token?.token);
        const authorization = { Authorization : `Bearer ${token?.token}` }
        config.headers = authorization;
        config.params = payload_data;
      }
    console.log("config: ", config);
    let response_data = await axios.get(url, config);
  
    return response_data;
  }
  
  