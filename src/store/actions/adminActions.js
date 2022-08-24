import actionTypes from "./actionTypes";
import {
    getAllCodeService, createNewUserService,
    getAllUserService, deleteUserService,
    editUserService, getTopDoctorHomeService, getAllDoctorService,
    saveDetailDoctorService, getDetailDoctorService, saveBulkScheduleDoctorSevice,
    getScheduleDoctorByDateSevice, getAllSpecialty, getAllClinic
} from '../../services/userService'
import { ToastContainer, toast } from 'react-toastify';

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
            if (res && res.errCode == 0) {
                toast.success("Create new user succeed!")
                console.log(res.errCode)
                dispath(createNewUserSuccess())
                dispath(fetchUserStart())
            }
            else {
                dispath(createNewUserFailed())
                toast.warn(res.errMessage)
            }
        } catch (error) {
            dispath(createNewUserFailed())
            toast.error("Create user failed!")
            console.log(error)
        }
    }

}
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchUserStart = () => {
    return async (dispath, getState) => {
        try {
            let res = await getAllUserService('all')
            if (res && res.errCode === 0) {
                dispath(fetchUserSuccess(res.users.reverse()))
            }

        } catch (error) {
            dispath(fetchUserFailed())
            console.log('fetch user failed')
            console.log(error)
        }
    }
}

export const fetchUserSuccess = (userData) => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    userData: userData
})
export const fetchUserFailed = () => ({
    type: actionTypes.FETCH_USER_FAILED
})

export const deleteUserStart = (id) => {
    return async (dispath, getState) => {
        try {
            let res = await deleteUserService(id)
            if (res && res.errCode === 0) {
                toast.success("delete user succeed!")
                dispath(deleteUserSuccess())
                dispath(fetchUserStart())
            }
            else {
                dispath(deleteUserFailed())
                toast.error("delete user failed!")
            }

        } catch (error) {
            dispath(deleteUserFailed())
            toast.error("delete user failed!")
            console.log(error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUserStart = (data) => {
    return async (dispath, getState) => {
        try {
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                toast.success("edit user succeed!")
                dispath(editUserSuccess())
                dispath(fetchUserStart())
            }
            else {
                dispath(editUserFailed())
                toast.error(res.errMessage)
            }

        } catch (error) {
            dispath(editUserFailed())
            toast.error("edit user failed!")
            console.log(error)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,

})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispath, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            if (res && res.errCode === 0) {
                dispath({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data
                })
            }
            else {
                dispath({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED', e)
            dispath({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllDoctor = () => {
    return async (dispath, getState) => {
        try {
            let res = await getAllDoctorService()
            if (res && res.errCode === 0) {
                dispath({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataAllDoctor: res.data
                })
            }
            else {
                dispath({
                    type: actionTypes.FETCH_All_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_All_DOCTOR_FAILED', e)
            dispath({
                type: actionTypes.FETCH_All_DOCTOR_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispath, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            if (res && res.errCode === 0) {
                toast.success("Save infor detail doctor succeed")
                dispath({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }
            else {
                toast.warn(res.errMessage)
                dispath({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            toast.warn('Save infor detail doctor failed')
            console.log('SAVE_DETAIL_DOCTOR_FAILED', e)
            dispath({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

export const fetchDetailDoctor = (id) => {
    return async (dispath, getState) => {
        try {
            let res = await getDetailDoctorService(id)
            if (res && res.errCode === 0) {
                dispath({
                    type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
                    dataDetailDoctor: res.data
                })
            }
            else {
                dispath({
                    type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_DETAIL_DOCTOR_FAILED', e)
            dispath({
                type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

export const fetchScheduleTime = () => {
    return async (dispath, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispath({
                    type: actionTypes.FETCH_SCHEDULE_TIME_SUCCESS,
                    scheduleTimeData: res.data
                })
            }
            else {
                dispath({
                    type: actionTypes.FETCH_SCHEDULE_TIME_FAILED
                })
            }
        } catch (error) {

            console.log('FETCH_SCHEDULE_TIME_FAILED', error)
            dispath({
                type: actionTypes.FETCH_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const saveScheduleDoctor = (data) => {
    return async (dispath, getState) => {
        try {
            let res = await saveBulkScheduleDoctorSevice(data)
            if (res && res.errCode === 0) {
                toast.success('Save schedule doctor succeed !')
                return res
                dispath({
                    type: actionTypes.SAVE_SCHEDULE_DOCTOR_SUCCESS,
                })
            }
            else {
                toast.error("save schedule doctor failed !")
                dispath({
                    type: actionTypes.SAVE_SCHEDULE_DOCTOR_FAILED
                })
            }
        } catch (error) {

            console.log('SAVE_SCHEDULE_DOCTOR_FAILED', error)
            dispath({
                type: actionTypes.SAVE_SCHEDULE_DOCTOR_FAILED
            })
        }
    }
}

export const getScheduleDoctorByDate = (doctorId, date) => {
    return async (dispath, getState) => {
        try {
            let res = await getScheduleDoctorByDateSevice(doctorId, date)
            if (res && res.errCode === 0) {
                dispath({
                    type: actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_SUCCESS,
                    scheduleOfADoctorByDate: res.data
                })
            }
            else {

                dispath({
                    type: actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED
                })
            }
        } catch (error) {

            console.log('FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED', error)
            dispath({
                type: actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED
            })
        }
    }
}

export const fetchRequiredDoctorInfor = () => {
    return async (dispath, getState) => {
        try {
            dispath({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()
            let dataDoctorRequired = {
                price: resPrice.data,
                payment: resPayment.data,
                province: resProvince.data,
                specialty: resSpecialty.data,
                clinic: resClinic.data
            }
            if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode == 0
                && resProvince && resProvince.errCode === 0 && resSpecialty && resSpecialty.errCode === 0) {
                dispath(fetchRequiredDoctorInforSuccess(dataDoctorRequired))
            }
            else {
                dispath(fetchRequiredDoctorInforFailed)
            }
        } catch (error) {
            dispath(fetchRequiredDoctorInforFailed)

        }
    }
}
export const fetchRequiredDoctorInforSuccess = (dataDoctorRequired) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    dataDoctorRequired: dataDoctorRequired
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,

})