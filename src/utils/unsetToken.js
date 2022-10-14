import { familyAuthToken }from './useToken';

export default function unsetToken(){

    localStorage.removeItem(familyAuthToken);
}