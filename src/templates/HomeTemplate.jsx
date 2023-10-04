import React from 'react'
import { IoTerminal } from 'react-icons/io5'
import { useSelector } from 'react-redux'

const HomeTemplate = () => {
	const { myInfo } = useSelector((state) => state.userReducer)
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

	return (
		<div>
			<div className='w-full h-16 bg-violet-500 flex items-center justify-between px-12'>
				<div className='flex items-center justify-center gap-4'>
					<IoTerminal className='w-8 h-8 text-white' />
					<h1 className='text-lg text-white font-semibold'>Management</h1>
				</div>
				<div className='flex items-center justify-center gap-4'>
					<h1 className='text-md text-white font-semibold'>
						Welcome Back,
						<span className='text-violet-900'> {myInfo.fullName}</span>
					</h1>
					<div className='w-10 h-10 rounded-full bg-black cursor-pointer'>
						<img
							className='w-full h-full rounded-full'
							src={`https://ui-avatars.com/api/?name=${myInfo.fullName}`}
							alt=''
						/>
					</div>
				</div>
			</div>
			<div className='flex'>
				<div className='w-3/12 h-10 bg-violet-500'></div>
				<div className='w-9/12 h-10 bg-slate-400'></div>
			</div>
		</div>
	)
}

export default HomeTemplate
