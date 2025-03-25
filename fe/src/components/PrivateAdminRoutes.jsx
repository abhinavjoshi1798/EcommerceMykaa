// import { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext";

// function PrivateAdminRoute({ children }) {
//   const { isAuth, user } = useContext(AuthContext);
//   const location = useLocation();
//   return isAuth && user.role === "admin" ? (
//     children
//   ) : (
//     <Navigate to={"/login"} state={location.pathname} replace />
//   );
// }

// export default PrivateAdminRoute;


import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function PrivateAdminRoute({ children }) {
  const { isAuth, user } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuth) {
    // If user is not authenticated, redirect to login page
    return <Navigate to={"/login"} state={{ from: location.pathname }} replace />;
  }

  if (isAuth && user.role !== "admin") {
    // If user is authenticated but not an admin, redirect to admin not found page
    return <Navigate to={"/adminonly"} state={{ from: location.pathname }} replace />;
  }

  // If user is authenticated and has admin role, render children
  return children;
}

export default PrivateAdminRoute;
