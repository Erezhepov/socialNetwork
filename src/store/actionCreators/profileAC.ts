import {
    GET_STATUS,
    IProfileData,
    PROFILE_DATA,
    PROFILE_ERROR,
    PROFILE_LOADING,
    PUT_PROFILE_DATA,
    PUT_PROFILE_PHOTO,
    PUT_STATUS,
    TProfileAction
} from "../../types/profile";
import {Dispatch} from "redux";
import axios from "axios";


export const ProfileAC = (userId: number) => {
    return async (dispatch: Dispatch<TProfileAction>) => {
        try{
            dispatch({type: PROFILE_LOADING})
            const response = await axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            if (response.data){
                dispatch(profileDataAC(response.data))
            }
        }
        catch (e){
            dispatch({type: PROFILE_ERROR, payload: 'Ошибка при получении profile данных'})
        }
    }
}
export const PutProfileAC = (data: any) => {
    return async (dispatch: Dispatch<TProfileAction | any>, getState: any) => {
        const id = getState().auth.userId
        try{
            dispatch({type: PROFILE_LOADING})
            const response = await axios.put(`https://social-network.samuraijs.com/api/1.0/profile`, data, {
                withCredentials: true,
                headers: {'API-KEY': 'e6a8a7ef-5858-4ade-a6e6-925e2ca655c7'}
            })
            if (!response.data.resultCode){
                dispatch({type: PUT_PROFILE_DATA})
                dispatch(ProfileAC(id))
            }
        }
        catch (e){
            dispatch({type: PROFILE_ERROR, payload: 'Ошибка при получении profile данных'})
        }
    }
}
export const GetStatusAC = (userId: number) => {
    return async (dispatch: Dispatch<TProfileAction>) => {
        try {
            dispatch({type: PROFILE_LOADING})
            const response = await axios.get(`https://social-network.samuraijs.com/api/1.0/profile/status/${userId}`)
            if (response.data){
                dispatch({type: GET_STATUS, payload: response.data})
            }
        }catch (e){
            dispatch({type: PROFILE_ERROR, payload: 'Ошибка при получении profile статуса'})
        }
    }
}
export const PutStatusAC = (status: string) => {
    return async (dispatch: Dispatch<TProfileAction>) => {
        try {
            dispatch({type: PROFILE_LOADING})
            const response = await axios.put(`https://social-network.samuraijs.com/api/1.0/profile/status`, {
                status: status
            }, {
                withCredentials: true,
                headers: {'API-KEY': 'e6a8a7ef-5858-4ade-a6e6-925e2ca655c7'}
            })
            if(!response.data.resultCode){
                dispatch( {type: PUT_STATUS})
            }
        }catch (e){
            dispatch({type: PROFILE_ERROR, payload: 'Ошибка при получении profile статуса'})
        }
    }
}
export const updateProfilePhoto = (file: any) => {
    const data = new FormData()
    data.append('image' ,file)
    return async (dispatch: Dispatch<TProfileAction>) => {
        try {
            dispatch({type: PROFILE_LOADING})
            const response = await axios.put('https://social-network.samuraijs.com/api/1.0/profile/photo', data,{
                withCredentials: true,
                headers: {
                    'API-KEY': 'e6a8a7ef-5858-4ade-a6e6-925e2ca655c7',
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (!response.data.resultCode){
                dispatch({type: PUT_PROFILE_PHOTO, payload: response.data.data.photos})
            }
        }catch (e){
            dispatch({type: PROFILE_ERROR, payload: 'Ошибка при загрузке фото'})
        }
    }
}

export const profileDataAC = (props: any): IProfileData => {
    return {type: PROFILE_DATA, payload:
            {
                aboutMe: props.aboutMe, userId: props.userId,
                fullName: props.fullName, photos: props.photos,
                lookingForAJob: props.lookingForAJob, lookingForAJobDescription: props.lookingForAJobDescription}
    }
}