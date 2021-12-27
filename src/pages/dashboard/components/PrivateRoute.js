import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserDataContext } from "context";

export const PrivateRoute = ({ component: Component, children, ...rest }) => {
  const { dataProviderValue } = useContext(UserDataContext);
  const { userData } = dataProviderValue;
  return (
    <Route
      {...rest}
      render={() =>
        userData.status === 500 ? (
          <Redirect to="/dashboard/company/create" />
        ) : (
          <Component />
        )
      }
    />
  );
};
