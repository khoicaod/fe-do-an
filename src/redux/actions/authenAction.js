import authenServices from '../../services/authenService'
import { ACCESS_TOKEN, ROLE, USER_ID } from '../../utils/constant'
import { getMyInfoAction } from './userAction'
import { closeLoadingAction, openLoadingAction } from './loadingAction'

export function signInAction(payload) {
	return async (dispatch, getState) => {
		const { navigate } = getState().navigateReducer
		dispatch(openLoadingAction())
		try {
			const { status, data } = await authenServices.signIn(payload)
			if (status === 200) {
				localStorage.setItem(ACCESS_TOKEN, data.data)
				await dispatch(getMyInfoAction())
				navigate('/user/info')
			}
		} catch (error) {
			alert(error.response?.data.message)
		}
		dispatch(closeLoadingAction())
	}
}

export function signUpAction(payload) {
	return async (dispatch, getState) => {
		const { navigate } = getState().navigateReducer
		try {
			const { status, data } = await authenServices.signUp(payload)
			if (status === 200) {
				navigate('/sign-in')
			}
		} catch (error) {
			alert(error.response?.data.message)
		}
	}
}

export function signOutAction() {
	return async (dispatch, getState) => {
		const { navigate } = getState().navigateReducer
		localStorage.removeItem(ACCESS_TOKEN)
		localStorage.removeItem(ROLE)
		localStorage.removeItem(USER_ID)
		navigate('/sign-in')
	}
}

export function validateToken() {
	return async (dispatch, getState) => {
		try {
			await authenServices.validateToken(localStorage.getItem(ACCESS_TOKEN))
			dispatch(getMyInfoAction())
		} catch (error) {
			dispatch(signOutAction())
		}
	}
}
