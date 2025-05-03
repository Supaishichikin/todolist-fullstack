import { createContext } from "react"
import { AuthContextInterface } from "../types/users";

const AuthContext = createContext<AuthContextInterface | null>(null);

export default AuthContext;