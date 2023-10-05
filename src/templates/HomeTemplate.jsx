import { Menu } from 'antd'
import React from 'react'
import { IoTerminal } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineUser } from 'react-icons/ai'
import { BsDoorOpen } from 'react-icons/bs'
import { GoSignOut } from 'react-icons/go'
import { NavLink, Outlet } from 'react-router-dom'
import { signOutAction } from '../redux/actions/authenAction'
import { ADMIN_ROLE } from '../utils/constant'

const HomeTemplate = () => {
	const { myInfo } = useSelector((state) => state.userReducer)

	const dispatch = useDispatch()
	// useEffect(() => {
	// 	const socket = new SockJS(LINK_API + '/ws/registry')
	// 	const stompClient = over(socket)
	// 	stompClient.connect({}, () => {
	// 		stompClient.subscribe('/ws/topic/e91ba283-68e5-4e18-8f6a-4a98a6816a7b', (response) => {})
	// 	})

	// 	return () => {
	// 		stompClient.disconnect()
	// 	}
	// }, [])
	function getItem(label, key, icon, children, type) {
		return {
			key,
			icon,
			children,
			label,
			type,
		}
	}
	const items = [
		getItem(
			<div className='flex items-center gap-2'>
				<AiOutlineUser className='text-lg text-violet-600' />
				<h1 className='text-violet-600 font-semibold text-md'>User Management</h1>
			</div>,
			'user',
			null,
			[
				getItem(
					<NavLink to={'/user/info'}>
						{({ isActive }) => (
							<span className={isActive ? 'text-white font-semibold' : 'text-black font-semibold'}>
								User Information
							</span>
						)}
					</NavLink>,
					'user-1'
				),
				myInfo.role === ADMIN_ROLE
					? getItem(
							<NavLink to={'/user/management'}>
								{({ isActive }) => (
									<span
										className={isActive ? 'text-white font-semibold' : 'text-black font-semibold'}>
										Users Data
									</span>
								)}
							</NavLink>,
							'user-2'
					  )
					: null,
			]
		),
		{
			type: 'divider',
		},
		getItem(
			<div className='flex items-center gap-2'>
				<BsDoorOpen className='text-lg text-violet-600' />
				<h1 className='text-violet-600 font-semibold text-md'>Room Management</h1>
			</div>,
			'room',
			null,
			[
				getItem(
					<NavLink to={'/room/info'}>
						{({ isActive }) => (
							<span className={isActive ? 'text-white font-semibold' : 'text-black font-semibold'}>
								Room Information
							</span>
						)}
					</NavLink>,
					'room-1'
				),
				myInfo.role === ADMIN_ROLE
					? getItem(
							<NavLink to={'/room/management'}>
								{({ isActive }) => (
									<span
										className={isActive ? 'text-white font-semibold' : 'text-black font-semibold'}>
										Rooms Data
									</span>
								)}
							</NavLink>,
							'room-2'
					  )
					: null,
			]
		),
	]

	return (
		<div className='flex'>
			<div className='w-2/12 h-screen fixed top-0 left-0 bg-violet-500 py-8 px-4 flex flex-col justify-between items-center'>
				<div>
					<div className='flex items-center justify-start gap-4 border-b-[1px] border-white pb-6'>
						<IoTerminal className='w-8 h-8 text-white' />
						<h1 className='text-lg text-white font-semibold'>Management</h1>
					</div>
					<div className='rounded-md pt-6'>
						<Menu
							className='w-full rounded-md'
							defaultSelectedKeys={['room-1']}
							defaultOpenKeys={['room']}
							mode='inline'
							items={items}
						/>
					</div>
				</div>
				<div
					onClick={() => {
						dispatch(signOutAction())
					}}
					className='flex items-center gap-4 text-white font-semibold text-2xl bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer'>
					<GoSignOut />
					<span>Sign Out</span>
				</div>
			</div>
			<div className='w-10/12 fixed right-0 top-0 py-8 px-4'>
				<div className='flex items-center justify-end'>
					<div className='flex items-center gap-4 font-semibold'>
						<h1>
							Welcome Back, <span className='text-violet-500 underline'>{myInfo.fullName}</span>
						</h1>
						<div className='w-14 h-14 rounded-full bg-violet-500'>
							<img
								className='w-full h-full rounded-full border-2 border-violet-500 cursor-pointer'
								src={`https://ui-avatars.com/api/?name=${myInfo.fullName}`}
								alt=''
							/>
						</div>
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	)
}

export default HomeTemplate
