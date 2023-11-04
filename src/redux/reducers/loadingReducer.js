import { CLOSE_LOADING, OPEN_LOADING } from '../constants/loadingConstant'

const initialState = {
	isLoading: false,
}

export default function loadingReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case OPEN_LOADING: {
			newState.isLoading = true
			return newState
		}
		case CLOSE_LOADING: {
			newState.isLoading = false
			return newState
		}
		default:
			return state
	}
}
