import * as authActions from './actionTypes'
import axios from '../../axios-base'

export const authStart = () => {
    return{
        type:authActions.AUTH_START
    }
}

export const authSuccess = (userData,accessToken) => {
    console.log("auth success");
    return{
        type:authActions.AUTH_SUCCCESS,
        userData:userData,
        accessToken:accessToken
    }
}

export const authSubmitSuccess = () => {
    return{
        type:authActions.AUTH_SUBMIT_SUCCESS
    }
}

export const authSubmitError = (err) => {
    return{
        type:authActions.AUTH_SUBMIT_ERROR,
        errors:err
    }
}

export const setAuthSubmitRedirectPath = () => {
    return{
        type:authActions.AUTH_SUBMIT_REDIRECT_PATH
    }
}

export const authFail = (error) => {
    console.log("auth Fail");
    return {
        type:authActions.AUTH_FAIL,
        error:error
    }
}

export const logout = ()=> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    return {
        type : authActions.AUTH_LOGOUT
    }
} 

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
         setTimeout(()=>{
             dispatch(logout());
         },expirationTime*1000);
     }
 }


export const authLogin = (username,password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username : username,
            password : password
        };
        axios.post("staffUser/login",authData)
            .then(response => {
                console.log(response);
                const expiratioDate = new Date(new Date().getTime()+response.data.expiration);
                localStorage.setItem('accessToken',response.data.authToken.accessToken);
                localStorage.setItem('refreshToken',response.data.authToken.refreshToken);
                localStorage.setItem('expirationDate',expiratioDate);
                localStorage.setItem('userId',response.data.userId)

                let userData = {
                    userId: response.data.userId,
                    name : response.data.name,
                    email : response.data.email,
                    username : response.data.userName,
                    userRole : {
                        roleId: response.data.userRole.roleId,
                        roleType: response.data.userRole.roleType
                    },
                    profileUrl:response.data.profileUrl
                }
                dispatch(authSuccess(userData,response.data.authToken.accessToken))
                dispatch(checkAuthTimeOut(response.data.expiration))
            }).catch(error=> {
                console.log(error.response);
                dispatch(authFail(error))
            })
    }
}

export const authSubmit = (userData,userType) => {
    console.log(userData);
    return dispatch => {
        dispatch(authStart());
        if(userType === 2){
            axios.post("staffUser/addNewUser",userData)
            .then((res)=>{
                console.log(res);
                dispatch(authSubmitSuccess());
            })
            .catch(err=>{
                console.log(err);
                dispatch(authSubmitError(err.response.data.message));
            })
        } else if(userType === 1){
            axios.post("staffUser/saveCompetitor",userData)
            .then((res)=>{
                console.log(res);
                dispatch(authSubmitSuccess());
            })
            .catch(err=>{
                console.log(err.response);
                dispatch(authSubmitError(err.response.data.message));
            })
        } else {
            dispatch(authSubmitError("Invalied Attempt"));
        }
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('accessToken');
        if(!token) {
            dispatch(logout());
        } else {
                localStorage.getItem('refreshToken');
                localStorage.getItem('expirationDate');
                localStorage.getItem('userId')
            const expiratioDate = new Date(localStorage.getItem('expirationDate'));
            if(expiratioDate > new Date()){
               // const refresh = localStorage.getItem('refreshToken');
                axios({
                    method:'get',
                    url:'/staffUser/getUserFromToken',
                    headers: {
                        Authorization: 'Bearer ' + token
                      }

                }).then((response) => {
                    console.log(response.data)
                    let userData = {
                        userId: response.data.userId,
                        name : response.data.name,
                        email : response.data.email,
                        username : response.data.userName,
                        userRole : {
                            roleId: response.data.userRole.roleId,
                            roleType: response.data.userRole.roleType
                        },
                        profileUrl:response.data.profileUrl
                    }
                    dispatch(authSuccess(userData,token))
                    dispatch(checkAuthTimeOut((expiratioDate.getTime() - new Date().getTime())/1000))
                }).catch((err)=>{
                    dispatch(authFail(err.response.data.message))
                })
            } else {
                dispatch(logout())
            }
        }
    }
}

