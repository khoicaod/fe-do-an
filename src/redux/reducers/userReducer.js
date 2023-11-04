import { GET_ALL_USER, GET_MY_INFO } from '../constants/userConstant'

const initialState = {
	myInfo: {
		username: '',
		address: '',
		email: '',
		phoneNumber: '',
		fullName: '',
		currentPassword: '',
		newPassword: '',
	},
	users: [],
}

export default function userReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case GET_MY_INFO: {
			newState.myInfo = payload
			return newState
		}
		case GET_ALL_USER: {
			newState.users = payload
			return newState
		}
		default:
			return state
	}
}
