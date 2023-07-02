import {
    GET_STATUS,
    IProfileState,
    PROFILE_DATA,
    PROFILE_ERROR,
    PROFILE_LOADING,
    PROFILE_STATUS,
    PUT_PROFILE_DATA,
    PUT_PROFILE_PHOTO,
    PUT_STATUS,
    TProfileAction
} from "../../types/profile";

const initialState: IProfileState = {
    status: '',
    photo: '',
    loading: false,
    error: null,
    aboutMe: '',
    fullName: '',
    photos: {
        large: null,
        small: null
    },
    userId: null,
    lookingForAJob: false,
    lookingForAJobDescription: null
}

export const ProfileReducer = (state = initialState, action: TProfileAction): IProfileState => {
    switch (action.type) {
        case PROFILE_STATUS:
            return {...state, loading: false, error: null, status: action.payload}
        case PROFILE_ERROR:
            return {...state, loading: false, error: action.payload}
        case PROFILE_LOADING:
            return {...state, loading: true, error: null}
        case PROFILE_DATA:
            debugger
            return {...state, loading: false, error: null, ...action.payload}
        case GET_STATUS:
            return {...state, loading: false, error: null, status: action.payload}
        case PUT_STATUS:
            return {...state, loading: false, error: null}
        case PUT_PROFILE_DATA:
            debugger
            return {...state, loading: false, error: null}
        case PUT_PROFILE_PHOTO:
            return {...state, loading: false, error: null, photos: action.payload }
        default: return state
    }
}