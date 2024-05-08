

import shopify_logo from './shopify-logo.png'
import profile_login from './profile-login.png'
import profile_signup from './profile-signup.png'

export const assets = {
    shopify_logo,
    profile_login,
    profile_signup
}

export const backend = "http://localhost:8080";
export const url = {
    signup: `${backend}/api/user/signup`,
    signin: `${backend}/api/user/signin`,
    userdetails: `${backend}/api/user/userdetails`,
    logout: `${backend}/api/user/logout`,
    allusers: `${backend}/api/user/allusers`,
    updateuser: `${backend}/api/user/updateuser`,
}