import { GET_MY_ROOMS } from '../constants/roomConstant'

const initialState = {
	myRooms: {},
}

export default function roomReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case GET_MY_ROOMS: {
			newState.myRooms = payload
			return newState
		}

		default:
			return state
	}
}
