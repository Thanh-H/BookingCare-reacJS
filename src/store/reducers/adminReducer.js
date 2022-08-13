import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    positions: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.genderData
            state.isLoadingGender = false
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false
            return {
                ...state,
            }

        //POSITION
        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.positionData
            state.isLoadingPosition = false
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoadingPosition = false
            return {
                ...state,
            }
        //ROLE
        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.roleData
            state.isLoadingRole = false
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoadingRole = false
            return {
                ...state,
            }


        default:
            return state;
    }
}

export default appReducer;