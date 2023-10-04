import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AuthenTemplate from './templates/AuthenTemplate'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { useDispatch } from 'react-redux'
import { ASSIGN_NAVIGATE } from './redux/constants/navigateConstant'
import NotFound from './pages/NotFound'
import { ACCESS_TOKEN } from './utils/constant'
import HomeTemplate from './templates/HomeTemplate'
import { getMyInfoAction } from './redux/actions/userAction'

function App() {
	const dispatch = useDispatch()

	const navigate = useNavigate()

	useEffect(() => {
		dispatch({ type: ASSIGN_NAVIGATE, payload: navigate })

		if (localStorage.getItem(ACCESS_TOKEN)) {
			dispatch(getMyInfoAction())
		}
	}, [])

	return (
		<div id='App' className='w-full min-h-screen'>
			<Routes>
				<Route element={<AuthenTemplate />}>
					<Route path='sign-in' element={<SignIn />} />
					<Route path='sign-up' element={<SignUp />} />
				</Route>

				<Route element={<ProtectedRoute condition={localStorage.getItem(ACCESS_TOKEN)} navigate='/sign-in' />}>
					<Route element={<HomeTemplate />} path='home'></Route>
				</Route>

				<Route path='' element={<Navigate to='home' />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
