
/**
 * 
 * function to humanize strings 
 * example an input of first_name
 * returns First Name
 * 
 * @param {*} str 
 * @returns str
 */

export function humanize(str) {
    let i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }


/**
 * 
 * function to calculate 
 * the age, from a date of birth 
 * string in the format (YYYY-MM-DD)
 * 
 * @param {} dob 
 * @returns int
 */
export  function calculate_age(dob) { 
    var diff_ms = Date.now() - (new Date(dob)).getTime();
    var age_dt = new Date(diff_ms); 
  
    return (Math.abs(age_dt.getUTCFullYear() - 1970)).toString();
}



export const injectArguments = (url, dict_of_args) => {
  let url_array = url.split("/");
  Object.keys(dict_of_args).map((key, index)=>{
      let param = ":"+key;
      let index_found = url_array.indexOf(param);
      if (index_found != -1){
          // replace that param with the value we have 
          // this mutates my array, in react importance is placed on immutablillty
          url_array[index_found] = dict_of_args[key];
      }
      return "";
  })
  // join the array back and return the resulting url
  let url_string = url_array.join("/");
  return url_string;
}