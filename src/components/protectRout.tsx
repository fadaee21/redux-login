import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../features/auth/authSlice";
import { useAppSelector } from "../store/hookStore";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ProtectRoute = () => {
  const data = useAppSelector(selectAuth);
  const valid = data?.user;
  useEffect(() => {
    if (!valid) {
      toast.error("you need to login");
    }
  }, [valid]);

  const content = valid ? <Outlet /> : <Navigate to="/login" replace={true} />;
  return content;
};

export default ProtectRoute;
