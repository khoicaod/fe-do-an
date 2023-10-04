import { GET_MY_INFO } from '../constants/userConstant'

const initialState = {
	myInfo: {},
}

export default function userReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case GET_MY_INFO: {
			newState.myInfo = payload
			return newState
		}

		default:
			return state
	}
}
