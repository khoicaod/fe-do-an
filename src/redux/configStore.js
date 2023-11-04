import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import navigateReducer from './reducers/navigateReducer'
import userReducer from './reducers/userReducer'
import roomReducer from './reducers/roomReducer'
import modalReducer from './reducers/modalReducer'
import loadingReducer from './reducers/loadingReducer'

const rootReducer = combineReducers({
	navigateReducer,
	userReducer,
	roomReducer,
	modalReducer,
	loadingReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
