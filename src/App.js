import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AuthenTemplate from './templates/AuthenTemplate'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { useDispatch, useSelector } from 'react-redux'
import { ASSIGN_NAVIGATE } from './redux/constants/navigateConstant'
import NotFound from './pages/NotFound'
import UserInfo from './pages/UserInfo'
import UserManagement from './pages/UserManagement'
import RoomInfo from './pages/RoomInfo'
import RoomManagement from './pages/RoomManagement'
import { ACCESS_TOKEN, ADMIN_ROLE } from './utils/constant'
import HomeTemplate from './templates/HomeTemplate'
import { getMyInfoAction } from './redux/actions/userAction'
import { validateToken } from './redux/actions/authenAction'

function App() {
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const { myInfo } = useSelector((state) => state.userReducer)

	useEffect(() => {
		dispatch({ type: ASSIGN_NAVIGATE, payload: navigate })

		if (localStorage.getItem(ACCESS_TOKEN)) {
			dispatch(validateToken())
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
					<Route element={<HomeTemplate />}>
						<Route path='user'>
							<Route element={<UserInfo />} path='info' />
							<Route element={<ProtectedRoute condition={myInfo.role === ADMIN_ROLE} navigate='*' />}>
								<Route element={<UserManagement />} path='management' />
							</Route>
							<Route path='' element={<Navigate to='info' />} />
						</Route>
						<Route path='room'>
							<Route element={<RoomInfo />} path='info' />
							<Route element={<ProtectedRoute condition={myInfo.role === ADMIN_ROLE} navigate='*' />}>
								<Route element={<RoomManagement />} path='management' />
							</Route>
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
