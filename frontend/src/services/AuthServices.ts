/**
 * Api calls for auth related operations
 */

import axiosInstance from '../utils/axiosInstance';

export async function UserRegister(
    email: string,
    password: string,
    username: string
){
    try{
        return await axiosInstance.post('/auth/register/',
            {email: email, password: password, username: username}); 
    }catch(error: any){
        return error.response
    }
}

export async function UserLogin(
    username: string,
    password: string
){
    try{
        return await axiosInstance.post('auth/token/',
            {username: username, password: password});
         
    }catch(error: any){
        return error.response
    }
}

export async function UserLogout(
    refreshToken: string
){
    try{
        return await axiosInstance.post('auth/logout/', 
            {refresh: refreshToken});
    }catch(error:any){
        return error.response;
    }
}

export async function UserRefreshToken(
    refreshToken: string
){
    try{
        return await axiosInstance.post('auth/token/refresh/',
            {refresh: refreshToken});
    }catch(error: any){
        return error.response;
    }
}

export async function UserResetPassword(
    email: string
){
    try{
        return await axiosInstance.post('auth/password-reset/',
        {email: email});
         
    }catch(error: any){
        return error.response;
    }
}

export async function UserConfirmResetPassword(
    token: string,
    uid: string,
    new_password: string
){
    try{
        return await axiosInstance.post('auth/password-reset-confirm/',
            {token: token, uid: uid, new_password: new_password})
        
    }catch(error: any){
        return error.response;
    }
}