import { CLOSE_LOADING, OPEN_LOADING } from '../constants/loadingConstant'

export function openLoadingAction() {
	return async (dispatch, getState) => {
		dispatch({ type: OPEN_LOADING })
	}
}

export function closeLoadingAction() {
	return async (dispatch, getState) => {
		dispatch({ type: CLOSE_LOADING })
	}
}
