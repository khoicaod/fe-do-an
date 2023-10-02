import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
