import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import navigateReducer from './reducers/navigateReducer'
import userReducer from './reducers/userReducer'
import roomReducer from './reducers/roomReducer'

const rootReducer = combineReducers({
	navigateReducer,
	userReducer,
	roomReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
