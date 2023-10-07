import userService from '../../services/userService'
import { ROLE, USER_ID } from '../../utils/constant'
import { GET_MY_INFO } from '../constants/userConstant'

export function getMyInfoAction() {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await userService.getMyInfo()
			if (status === 200) {
				localStorage.setItem(ROLE, data.data.role)
				localStorage.setItem(USER_ID, data.data.pk)
				dispatch({ type: GET_MY_INFO, payload: data.data })
			}
		} catch (error) {
			alert(error.response?.data.message)
		}
	}
}
