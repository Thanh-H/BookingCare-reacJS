import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService } from '../../services/userService'

//GENDER
export const fetchGenderStart = () => {
    return async (dispath, getState) => {
        try {
            dispath({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispath(fetchGenderSuccess(res.data))
            }
            else {
                dispath(fetchGenderFaided)
            }
        } catch (error) {
            dispath(fetchGenderFaided)

        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    genderData: genderData
})

export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,

})

//POSITION
export const fetchPositionStart = () => {
    return async (dispath, getState) => {
        try {
            dispath({
                type: actionTypes.FETCH_POSITION_START
            })
            let res = await getAllCodeService('POSITION')
            if (res && res.errCode === 0) {
                dispath(fetchPositionSuccess(res.data))
            }
            else {
                dispath(fetchPositionFaided)
            }
        } catch (error) {
            dispath(fetchPositionFaided)

        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    positionData: positionData
})

export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,

})

//ROLE
export const fetchRoleStart = () => {
    return async (dispath, getState) => {
        try {
            dispath({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCodeService('ROLE')
            if (res && res.errCode === 0) {
                dispath(fetchRoleSuccess(res.data))
            }
            else dispath(fetchRoleFaided())

        } catch (error) {
            dispath(fetchRoleFaided())
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    roleData: roleData
})

export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,

})

//CREATE NEW USER
export const createNewUser = (data) => {
    return async (dispath, getState) => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                dispath(createNewUserSuccess())
            }
            else dispath(createNewUserFailed())

        } catch (error) {
            dispath(createNewUserFailed())
        }
    }

}
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

