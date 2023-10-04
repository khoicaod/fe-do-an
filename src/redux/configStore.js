import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import navigateReducer from './reducers/navigateReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
	navigateReducer,
	userReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
