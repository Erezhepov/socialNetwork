export const PROFILE_LOADING = 'PROFILE_LOADING'
export const PROFILE_ERROR = 'PROFILE_ERROR'
export const PROFILE_DATA = 'PROFILE_DATA'
export const GET_STATUS = 'GET_STATUS'
export const PUT_STATUS = 'PUT_STATUS'
export const PUT_PROFILE_DATA = 'PUT_PROFILE_DATA'
export const PUT_PROFILE_PHOTO = 'PUT_PROFILE_PHOTO'

export interface IProfileState {
    status: string
    loading: boolean
    error: null | string
    aboutMe: string
    fullName: string
    photos: {
        large: string | null
        small: string | null
    }
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: null | string
    contacts: {
        github: string | null
        instagram: string | null
        vk: string | null
        facebook: string | null
        youtube: string | null
        website: string | null
    }
}
export interface IGetStatus {
    type: typeof GET_STATUS
    payload: string
}
export interface IPutProfileData {
    type: typeof PUT_PROFILE_DATA
}
export interface IPutStatus {
    type: typeof PUT_STATUS
}
export interface IProfileError {
    type: typeof PROFILE_ERROR
    payload: string
}
export interface IProfileLoading {
    type: typeof PROFILE_LOADING
}
export interface IProfilePhoto {
    type: typeof PUT_PROFILE_PHOTO
    payload: {
        small: string | null
        large: string | null
    }
}
export interface IProfileData {
    type: typeof PROFILE_DATA
    payload: {
        aboutMe?: string
        fullName?: string
        userId: number | null
        photos: {
            large: string
            small: string
        }
        lookingForAJob: boolean
        lookingForAJobDescription: null | string
        contacts: {
            github: string | null
            instagram: string | null
            vk: string | null
            facebook: string | null
            youtube: string | null
            website: string | null
        }
    }
}
export type TProfileAction = IProfileData | IProfileError
    | IProfileLoading | IGetStatus | IPutStatus | IPutProfileData | IProfilePhoto