import {Navigate, useLocation} from "react-router-dom";
import { useAuth } from "../contexts/authContextProvider"; 

interface RequireAuthInterface {
    children?: React.ReactNode
}

export const AuthGuard: React.FC<RequireAuthInterface> = ({children}) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth?.isAuthenticated) {
        return <Navigate to="/login" state={{path: location.pathname}}/>;
    }
    return (
        <>
            {children}
        </>
    );
}