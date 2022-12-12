import { BASE_URL } from '../project_config';


export const LOGIN_URL = BASE_URL + '/core/login/';

export const SIGNUP_URL = BASE_URL + '/core/signup/';

export const CHANGE_PASSWORD_URL = BASE_URL + '/core/change_password/';

export const GET_UPDATE_PROFILE_URL = BASE_URL + '/core/user_profile/';

export const GET_FAMILY_TREE = BASE_URL + "/family/";

export const GET_FAMILY_TREE_V2 = BASE_URL + "/family/v2/";

export const GET_FAMILY_BIO_PAGE = BASE_URL + "/family/details/:id/";

export const SEARCH_FAMILY_TREE = BASE_URL + "/family/search/";

export const GET_EVENTS_PAGE = BASE_URL + "/events/recent_and_upcoming";

export const GET_EVENTS_DETAIL_PAGE = BASE_URL + "/events/:id/";

export const GET_EVENTS_PAGINATED = BASE_URL + "/events/";

export const GET_PROJECTS = BASE_URL + "/projects/all"