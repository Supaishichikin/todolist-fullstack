import { UserRefreshToken } from "../services/AuthServices";

// Retrieve if exist, access and refresh token stored and localStorage
let accessToken = localStorage.getItem("userToken") ?? null;
const refreshToken = localStorage.getItem("userRefreshToken") ?? null;

// Function to check token validity
export function isTokenExpired(token: string | null) {
    if (!token) {
      return true;
    }
    // split token parts in a list to check the expiry datetime
    const tokenParts = token.split('.'); 
    const tokenPayload = JSON.parse(atob(tokenParts[1]));
    const expirationTime = tokenPayload.exp * 1000;

    // if the expiry datetime is before actual datetime return false else return true
    return Date.now() >= expirationTime;
}


// Function for handling refresh token
export async function handleAuthRefresh(){
    // Check if refreshToken exist and if so, its expiry date
    if (refreshToken && !isTokenExpired(refreshToken)) {
        // If refresh token is expired call refresh token api route
        try{
            await UserRefreshToken(refreshToken).then((response) => {
                localStorage.setItem('userToken', response.data.access);
                accessToken = response.data.access;
            })
            // If it goes well, return the access token
            return {access: accessToken}
        }catch(error: any){
            // if it fails, return the error and clear storage to logout
            localStorage.clear();
            return error.response
        }
    }
}

