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
export {
    handleLoginApi, getAllUserService, createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorHomeService
}