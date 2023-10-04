import userService from '../../services/userService'
import { GET_MY_INFO } from '../constants/userConstant'

export function getMyInfoAction() {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await userService.getMyInfo()
			if (status === 200) {
				dispatch({ type: GET_MY_INFO, payload: data.data })
			}
		} catch (error) {
			alert(error.response?.data.message)
		}
	}
}
