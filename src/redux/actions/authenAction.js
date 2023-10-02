import authenServices from '../../services/authenService'
import { ACCESS_TOKEN } from '../../utils/constant'

export function signInAction(payload) {
	return async (dispatch, getState) => {
		const { navigate } = getState().navigateReducer
		try {
			const { status, data } = await authenServices.signIn(payload)
			console.log(data)
			if (status === 200) {
				localStorage.setItem(ACCESS_TOKEN, data.data)
				navigate('/home')
			}
		} catch (error) {
			alert(error.response.data.message)
		}
	}
}

export function signUpAction(payload) {
	return async (dispatch, getState) => {
		const { navigate } = getState().navigateReducer
		try {
			const { status, data } = await authenServices.signUp(payload)
			console.log(payload)
			if (status === 200) {
				navigate('/sign-in')
			}
		} catch (error) {
			alert(error.response.data.message)
		}
	}
}
