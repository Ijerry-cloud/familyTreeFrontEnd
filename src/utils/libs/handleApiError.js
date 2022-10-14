import toast from 'react-hot-toast';

/**
 * 
 * function to handle api errors
 * 
 * this function has side effects
 * 
 * @args error - the error response from the api
 * @return null
 * 
 */
export function handleApiError(error){
    
    let message = error?.response?.data?.message ? error?.response?.data?.message : error.toString();
    toast.error(message)
    return
}