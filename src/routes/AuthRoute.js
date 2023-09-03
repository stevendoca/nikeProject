import { useAppSelector } from "app/hooks";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = () => {
  const userType = useSelector(
    (state) => state.LoginReducer.currentUser?.userType
  );
  const checkAuth = useSelector((state) => state.LoginReducer.auth);

  if (userType === "user") {
    return checkAuth === true ? <Navigate to="/" replace={true} /> : <Outlet />;
  } else if (userType === "admin") {
    return checkAuth === true ? (
      <Navigate to="/dashboard/users" replace={true} />
    ) : (
      <Outlet />
    );
  } else return <Outlet />;
};

export default AuthRoute;
