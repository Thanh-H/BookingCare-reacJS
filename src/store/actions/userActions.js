import actionTypes from './actionTypes';

export const userLoginSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})