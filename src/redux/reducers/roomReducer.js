import { GET_HARDWARE_HISTORIES, GET_MY_ROOMS, GET_POWER_WATER_HISTORIES } from '../constants/roomConstant'

const initialState = {
	myRooms: {},
	hardwareHistories: [],
	powerAndWaterHistories: [],
}

export default function roomReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case GET_MY_ROOMS: {
			newState.myRooms = payload
			return newState
		}
		case GET_HARDWARE_HISTORIES: {
			newState.hardwareHistories = payload
			return newState
		}
		case GET_POWER_WATER_HISTORIES: {
			newState.powerAndWaterHistories = payload
			return newState
		}
		default:
			return state
	}
}
