import roomService from '../../services/roomService'
import { GET_MY_ROOMS } from '../constants/roomConstant'

export function getAllRoomsOfUserAction() {
	return async (dispatch, getState) => {
		const { myInfo } = getState().userReducer
		try {
			const { status, data } = await roomService.getAllRoomsOfUser(myInfo.pk)
			if (status === 200) {
				dispatch({ type: GET_MY_ROOMS, payload: data.data })
			}
		} catch (error) {
			alert(error.response?.data.message)
		}
	}
}
