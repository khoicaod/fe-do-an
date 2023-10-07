import roomService from '../../services/roomService'
import { USER_ID } from '../../utils/constant'
import { GET_MY_ROOMS } from '../constants/roomConstant'

export function getAllRoomsOfUserAction() {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await roomService.getAllRoomsOfUser(localStorage.getItem(USER_ID))
			if (status === 200) {
				dispatch({ type: GET_MY_ROOMS, payload: data.data })
			}
		} catch (error) {
			alert(error.response?.data.message)
		}
	}
}
