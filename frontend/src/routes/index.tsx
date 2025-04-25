import { useRoutes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HomeTodos from "../pages/HomeTodos";
import Login from "../pages/Login";
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
        { path: "/", element: <HomeTodos /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/achievement", element: <Achievements /> },
    ]);
}