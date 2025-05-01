import { useRoutes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HomeTasks from "../pages/HomeTasks";
import Login from "../pages/Login";
import AccountSettings from "../pages/AccountSettings";
import Layout from "../pages/Layout";
import Achievements from "../pages/Achievemnents";
import Register from "../pages/Register";

const RedirectToHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [navigate]);

    return null;
}

export default function Router() {
    return useRoutes([
        { path: "/", element: <Layout><HomeTasks /></Layout> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/settings", element: <Layout><AccountSettings /></Layout> },
        { path: "/achievements", element: <Layout><Achievements /></Layout> },
    ]);
}