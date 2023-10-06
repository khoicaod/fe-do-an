import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRoomsOfUserAction } from '../redux/actions/roomAction'

const RoomInfo = () => {
	const dispatch = useDispatch()
	const { myInfo } = useSelector((state) => state.userReducer)
	const { myRooms } = useSelector((state) => state.roomReducer)

	useEffect(() => {
		if (JSON.stringify(myInfo) !== '{}') {
			dispatch(getAllRoomsOfUserAction())
		}
	}, [myInfo])

	return (
		<div className='grid grid-cols-4 gap-4'>
			{JSON.stringify(myRooms) !== '{}'
				? myRooms.map((room, index) => (
						<div
							key={index}
							className='w-full h-96 bg-violet-400 rounded-2xl shadow-lg shadow-slate-500 cursor-pointer'>
							{room.name}
						</div>
				  ))
				: null}
		</div>
	)
}

export default RoomInfo
