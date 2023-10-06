import authenServices from '../../services/authenService'
import { ACCESS_TOKEN } from '../../utils/constant'
import { getMyInfoAction } from './userAction'

export function signInAction(payload) {
	return async (dispatch, getState) => {
		const { navigate } = getState().navigateReducer
		try {
			const { status, data } = await authenServices.signIn(payload)
			if (status === 200) {
				localStorage.setItem(ACCESS_TOKEN, data.data)
				dispatch(getMyInfoAction())
				navigate('/room/info')
			}
		} catch (error) {
			alert(error.response?.data.message)
		}
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
		navigate('/sign-in')
	}
}

export function validateToken() {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await authenServices.validateToken(localStorage.getItem(ACCESS_TOKEN))
			if (status === 200) {
				dispatch(getMyInfoAction())
			}
		} catch (error) {
			dispatch(signOutAction())
		}
	}
}
