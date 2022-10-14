/**
 * 
 * function to format a date string 
 * into yyyy-mm-dd format
 * 
 * @args dateString - a valid js date string e.g Mon Aug 25 2014 21:11:54 GMT+0100 (West Africa Standard Time)
 * @return date - a date string in the format yyyy-mm-dd
 * 
 */
export function uFormatDate(dateString){
    let chosenDate = new Date(dateString);
    let formattedDate = chosenDate.toISOString().split('T')[0];
    return formattedDate;
}