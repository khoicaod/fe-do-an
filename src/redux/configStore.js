import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import navigateReducer from './reducers/navigateReducer'

const rootReducer = combineReducers({
	navigateReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
