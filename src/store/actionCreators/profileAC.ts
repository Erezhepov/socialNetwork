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
import {instance} from "../../api/api";
import {IFetch, ResultCodeEnum} from "./user";

interface IProfileAC {
    aboutMe: string
    fullName: string
    userId: number | null
    contacts: Object
    photos: {
        large: string
        small: string
    }
    lookingForAJob: boolean
    lookingForAJobDescription: null | string
}

interface IUpdatePhoto extends IFetch {
    data: {
        photos: {
            large: string
            small: string
        }
    }
}

export const profileAC = (userId: number) => {
    return async (dispatch: Dispatch<TProfileAction | any>) => {
        try {
            dispatch({type: PROFILE_LOADING})
            const response = await instance.get(`profile/${userId}`)
            const data: IProfileAC = response.data
            if (data) {
                dispatch(profileDataAC(data))
                dispatch(GetStatusAC(userId))
            }
        } catch (e) {
            dispatch({type: PROFILE_ERROR, payload: 'Ошибка при получении profile данных'})
        }
    }
}
export const putProfileAC = (data: any) => {
    return async (dispatch: Dispatch<TProfileAction | any>, getState: any) => {
        const id = getState().auth.userId
        try {
            dispatch({type: PROFILE_LOADING})
            const response = await instance.put(`profile`, data)
            const responseData: IFetch = response.data
            if (responseData.resultCode === ResultCodeEnum.success) {
                dispatch({type: PUT_PROFILE_DATA})
                dispatch(profileAC(id))
            }
        } catch (e) {
            dispatch({type: PROFILE_ERROR, payload: 'Ошибка при получении profile данных'})
        }
    }
}
export const GetStatusAC = (userId: number) => {
    return async (dispatch: Dispatch<TProfileAction>) => {
        try {
            dispatch({type: PROFILE_LOADING})
            const response = await instance.get(`profile/status/${userId}`)
            const data: string = response.data
            if (data) dispatch({type: GET_STATUS, payload: data})
        } catch (e) {
            dispatch({type: PROFILE_ERROR, payload: 'Ошибка при получении profile статуса'})
        }
    }
}
export const PutStatusAC = (status: string) => {
    return async (dispatch: Dispatch<TProfileAction>) => {
        try {
            dispatch({type: PROFILE_LOADING})
            const response = await instance.put(`profile/status`, {status: status})
            const data: IFetch = response.data
            if (data.resultCode === ResultCodeEnum.success) dispatch({type: PUT_STATUS})
        } catch (e) {
            dispatch({type: PROFILE_ERROR, payload: 'Ошибка при получении profile статуса'})
        }
    }
}
export const updateProfilePhoto = (file: File) => {
    const fileData = new FormData()
    fileData.append('image', file)
    return async (dispatch: Dispatch<TProfileAction>) => {
        try {
            dispatch({type: PROFILE_LOADING})
            const response = await instance.put('profile/photo', fileData)
            const responseData: IUpdatePhoto = response.data
            if (responseData.resultCode === ResultCodeEnum.success) {
                dispatch({type: PUT_PROFILE_PHOTO, payload: responseData.data.photos})
            }
        } catch (e) {
            dispatch({type: PROFILE_ERROR, payload: 'Ошибка при загрузке фото'})
        }
    }
}

export const profileDataAC = (props: any): IProfileData => {
    return {
        type: PROFILE_DATA, payload:
            {
                aboutMe: props.aboutMe, userId: props.userId,
                fullName: props.fullName, photos: props.photos,
                lookingForAJob: props.lookingForAJob, lookingForAJobDescription: props.lookingForAJobDescription,
                contacts: {
                    facebook: props.contacts.facebook,
                    vk: props.contacts.vk,
                    github: props.contacts.github,
                    website: props.contacts.website,
                    instagram: props.contacts.instagram,
                    youtube: props.contacts.youtube,
                }
            }
    }
}