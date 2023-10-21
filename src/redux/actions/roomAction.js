import roomService from '../../services/roomService'
import { ADMIN_ROLE, USER_ID } from '../../utils/constant'
import { GET_MY_ROOMS } from '../constants/roomConstant'

export function getAllRoomsOfUserAction() {
	return async (dispatch, getState) => {
		try {
			let response
			if (localStorage.getItem('ROLE') === ADMIN_ROLE) {
				response = await roomService.getAllRooms()
			} else {
				response = await roomService.getAllRoomsOfUser(localStorage.getItem(USER_ID))
			}

			if (response.status === 200) {
				dispatch({ type: GET_MY_ROOMS, payload: response.data.data })
			}
		} catch (error) {
			alert(error.response?.data.message)
		}
	}
}

export function updateHardwareAction(payload) {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await roomService.updateHardware(payload)
			if (status === 200) {
				// dispatch({ type: GET_MY_ROOMS, payload: data.data })
			}
		} catch (error) {
			alert(error.response?.data.message)
		}
	}
}
