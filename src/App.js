import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AuthenTemplate from './templates/AuthenTemplate'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { useDispatch } from 'react-redux'
import { ASSIGN_NAVIGATE } from './redux/constants/navigateConstant'
import NotFound from './pages/NotFound'

function App() {
	const dispatch = useDispatch()

	const navigate = useNavigate()

	useEffect(() => {
		dispatch({ type: ASSIGN_NAVIGATE, payload: navigate })
	}, [])

	return (
		<div id='App' className='w-full min-h-screen overflow-hidden'>
			<Routes>
				<Route element={<AuthenTemplate />}>
					<Route path='sign-in' element={<SignIn />} />
					<Route path='sign-up' element={<SignUp />} />
				</Route>

				<Route element={<ProtectedRoute condition={true} navigate='/sign-in' />}></Route>

				<Route path='' element={<Navigate to='home' />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
