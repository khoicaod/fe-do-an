import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import ModalBase from './components/ModalBase'
import AuthenTemplate from './templates/AuthenTemplate'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { useDispatch } from 'react-redux'
import { ASSIGN_NAVIGATE } from './redux/constants/navigateConstant'
import NotFound from './pages/NotFound'
import UserInfo from './pages/UserInfo'
import UserManagement from './pages/UserManagement'
import RoomInfo from './pages/RoomInfo'
import { ACCESS_TOKEN, ADMIN_ROLE, ROLE } from './utils/constant'
import HomeTemplate from './templates/HomeTemplate'
import { validateToken } from './redux/actions/authenAction'

function App() {
	const dispatch = useDispatch()

	const navigate = useNavigate()

	useEffect(() => {
		dispatch({ type: ASSIGN_NAVIGATE, payload: navigate })

		if (localStorage.getItem(ACCESS_TOKEN)) {
			dispatch(validateToken())
		}
	}, [])

	return (
		<div id='App' className='w-full min-h-screen'>
			<ModalBase />
			<Routes>
				<Route element={<AuthenTemplate />}>
					<Route path='sign-in' element={<SignIn />} />
					<Route path='sign-up' element={<SignUp />} />
				</Route>

				<Route element={<ProtectedRoute condition={localStorage.getItem(ACCESS_TOKEN)} navigate='/sign-in' />}>
					<Route element={<HomeTemplate />}>
						<Route path='user'>
							<Route element={<UserInfo />} path='info' />
							<Route
								element={
									<ProtectedRoute
										condition={localStorage.getItem(ROLE) === ADMIN_ROLE}
										navigate='*'
									/>
								}>
								<Route element={<UserManagement />} path='management' />
							</Route>
							<Route path='' element={<Navigate to='info' />} />
						</Route>
						<Route path='room'>
							<Route element={<RoomInfo />} path='info/:token' />
							<Route path='' element={<Navigate to='info' />} />
						</Route>
					</Route>
				</Route>

				<Route path='' element={<Navigate to='/room/info' />} />
				<Route path='*' element={<Navigate to='/not-found' />} />
				<Route path='/not-found' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
