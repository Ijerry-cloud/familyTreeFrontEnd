import React from "react";
import { Redirect, Route } from "react-router-dom";
import useToken from "../../utils/useToken";
import  { APP_LOGIN_PAGE } from '../../utils/app_routes';


function ProtectedRoute({ component: Component, ...restOfProps }) {
  
  const { token, setToken } = useToken();

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to={APP_LOGIN_PAGE} />
      }
    />
  );
}

export default ProtectedRoute;