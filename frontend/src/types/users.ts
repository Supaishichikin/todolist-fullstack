/**
 * Interfaces for Users related objects
*/

export interface User {
    id: number;
    username: string;
    email?: string;
}
  
// Pour s’inscrire ou se connecter
export interface AuthCredentials {
    username: string;
    password: string;
}
  
// Réponse d’authentification (ex : login)
export interface AuthResponse {
    access_token: string;
    refresh_token?: string;
    user: User;
}

export interface AuthContextInterface {
    userToken: string | null,
    userRefreshToken: string | null,
    setUserToken: Function,
    setUserRefreshToken: Function,
    login: Function,
    logout: Function,
    isAuthenticated: boolean,
    setIsAuthenticated: Function,
    updateUserToken: Function
}

export interface AuthProviderInterface {
    children: React.ReactNode
}