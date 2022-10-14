
/**
 * 
 * function that checks if every key in an object is falsy js values e.g '', 0, null, false, undefined e.t.c
 * if all keys are false it return true
 * else it return  false
 * 
 * this function is primarily used for form validation
 * to ensure all checks are passed
 * 
 * @args object -  a js object with keys
 * @return boolean - a boolean indicating true or false
 * 
 */
export function checkObject(obj){
    return Object.keys(obj).every((key) => !obj[key])
}

/**
 * 
 * function checks if a value is falsy, 
 * then return false, if not it returns true
 * 
 * this function is primarily used for the error 
 * prop in react material u.i text field component
 * the prop expects a boolean value
 * 
 *  * @param value 
    * @returns boolean
 */
export function isError(value){
    return !((value == "") || (value == null) || (value == undefined));
}

