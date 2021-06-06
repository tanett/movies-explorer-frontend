import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {LoggedInContext} from "../../context/LoggedInContext";

const ProtectedRoute = ({component: Component, ...props}) => {
  const isLoggedIn = React.useContext(LoggedInContext);
console.log(isLoggedIn);
  return (
      <Route>
        {
          () => (isLoggedIn || localStorage.getItem('jwt') ) ? <Component {...props} /> : <Redirect to="/signin"/>
        }
      </Route>
  )
}

export default ProtectedRoute;
