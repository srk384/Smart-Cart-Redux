import { Navigate } from "react-router-dom";
import { useVerifyUserQuery } from "../../redux/APIs/authAPI";
import LoadingFallback from "../LoadingFallback";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/productDataSlice";
import { useEffect } from "react";
import Navbar from '../Navbar'
import Footer from '../Footer'

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useVerifyUserQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [isSuccess, data, dispatch]);

  // 1. Wait for JWT verification to finish
  if (isLoading) {
    return <><Navbar/><LoadingFallback /><Footer/></>;
  }

  // 2. If verification fails, redirect to login
  if (!isLoading && (isError || !data)) {
    console.error("JWT error:", error?.data?.error || "Unknown error");
    return <Navigate to="/login" replace />;
  }

  // 3. If verified, show protected content
  return children;
};



export default ProtectedRoute;
