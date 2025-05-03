import { useRoutes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HomeTasks from "../pages/HomeTasks";
import Login from "../pages/auth/Login";
import AccountSettings from "../pages/AccountSettings";
import Layout from "../components/layout/Layout";
import Achievements from "../pages/Achievemnents";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import ResetPasswordConfirm from "../pages/auth/ResetPasswordConfirm";
import { AuthGuard } from "../guards/authGuards";

const RedirectToHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/tasks");
    }, [navigate]);

    return null;
}

export default function Router() {
    return useRoutes([
        { path: "/", element: <RedirectToHome/>},
        { path: "/tasks", element: <AuthGuard><Layout><HomeTasks /></Layout></AuthGuard> },
        { path: "/settings", element: <AuthGuard><Layout><AccountSettings /></Layout></AuthGuard> },
        { path: "/achievements", element: <AuthGuard><Layout><Achievements /></Layout></AuthGuard> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/reset-password", element: <ResetPassword />},
        { path: "/reset-password-confirm", element: <ResetPasswordConfirm />}
    ]);
}