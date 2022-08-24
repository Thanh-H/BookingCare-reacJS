import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUserService = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId })
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)

}

const deleteUserService = (id) => {
    return axios.delete('/api/delete-new-user',
        {
            data: {
                id: id
            }
        }
    )
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)

}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorService = () => {
    return axios.get(`/api/all-doctor`)
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctor`, data)
}

const getDetailDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveBulkScheduleDoctorSevice = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorByDateSevice = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}


const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialTy`, data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}

const getDetailSpecialById = (id, location) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${id}&location=${location}`)
}

const getNameSpecialtyByDoctorId = (doctorId) => {
    return axios.get(`/api/get-name-specialty-by-doctorId?doctorId=${doctorId}`)
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}

const getDetailClinicById = (id, location) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}&location=${location}`)
}
export {
    handleLoginApi, getAllUserService, createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctorService,
    saveDetailDoctorService, getDetailDoctorService, saveBulkScheduleDoctorSevice,
    getScheduleDoctorByDateSevice, getExtraInforDoctorById, getProfileDoctorById,
    postPatientBookAppointment, postVerifyBookAppointment, createNewSpecialty,
    getAllSpecialty, getDetailSpecialById, getNameSpecialtyByDoctorId,
    createNewClinic, getAllClinic, getDetailClinicById
}