import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import SockJS from 'sockjs-client'
import { LINK_API } from '../utils/constant'
import { over } from 'stompjs'
import { FaFireFlameCurved, FaGasPump, FaGaugeSimpleHigh, FaTemperatureHalf } from 'react-icons/fa6'
import { PiSneakerMoveFill } from 'react-icons/pi'
import { WiHumidity } from 'react-icons/wi'
import { MdGasMeter } from 'react-icons/md'
import { ImSwitch } from 'react-icons/im'
import { Switch } from 'antd'
import { updateHardwareAction } from '../redux/actions/roomAction'

const defaultHardwareValue = {
	gasSensorValue: 'N/A',
	flameSensorValue: 'N/A',
	pressureSensorValue: 'N/A',
	motionSensorValue: 'N/A',
	temperatureSensorValue: 'N/A',
	humiditySensorValue: 'N/A',
	secondMotionSensorValue: 'N/A',
	acSwitch: false,
	acPumpSwitch: false,
	reservedSwitch: false,
	updatedOn: 'N/A',
}

const RoomInfo = () => {
	const { myRooms } = useSelector((state) => state.roomReducer)
	const dispatch = useDispatch()

	const pathVariable = useParams().token

	const [hardware, setHardware] = useState()
	const [thisRoom, setThisRoom] = useState()

	useEffect(() => {
		setHardware(defaultHardwareValue)

		const socket = new SockJS(LINK_API + '/ws/registry')
		const stompClient = over(socket)
		stompClient.connect({}, () => {
			stompClient.subscribe(`/ws/topic/${pathVariable}`, (response) => {
				const data = JSON.parse(response.body)
				setHardware(data)
			})
		})
		return () => {
			if (stompClient.connected) {
				stompClient.disconnect()
			}
		}
	}, [pathVariable])

	useEffect(() => {
		if (myRooms.length > 0) {
			const thisRoom = myRooms.find((room) => room.token === pathVariable)
			setThisRoom(thisRoom)
		}
	}, [myRooms])

	return (
		<div className='flex flex-col gap-4 p-8 shadow-slate-600 shadow-lg rounded-2xl'>
			<h1 className='text-4xl'>
				Hardware Status:{' '}
				{thisRoom?.isUsed ? (
					<span className='text-green-500'>Active</span>
				) : (
					<span className='text-red-500'>In Active</span>
				)}
			</h1>
			<div className='grid grid-cols-4 gap-8'>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<MdGasMeter className='text-blue-500 text-7xl' />
					<h1 className='font-semibold text-4xl'>Gas Sensor</h1>
					<h1 className='font-semibold text-2xl'>{hardware?.gasSensorValue}</h1>
				</div>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<FaFireFlameCurved className='text-red-500 text-7xl' />
					<h1 className='font-semibold text-4xl'>Flame Sensor</h1>
					<h1 className='font-semibold text-2xl'>{hardware?.flameSensorValue}</h1>
				</div>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<FaGaugeSimpleHigh className='text-green-700 text-7xl' />
					<h1 className='font-semibold text-4xl'>Pressure Sensor</h1>
					<h1 className='font-semibold text-2xl'>{hardware?.pressureSensorValue}</h1>
				</div>
				<div></div>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<FaTemperatureHalf className='text-red-500 text-7xl' />
					<h1 className='font-semibold text-4xl'>Temperature Sensor</h1>
					<h1 className='font-semibold text-2xl'>{hardware?.temperatureSensorValue}</h1>
				</div>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<WiHumidity className='text-blue-500 text-7xl' />
					<h1 className='font-semibold text-4xl'>Humid Sensor</h1>
					<h1 className='font-semibold text-2xl'>{hardware?.humiditySensorValue}</h1>
				</div>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<PiSneakerMoveFill className='text-green-700 text-7xl' />
					<h1 className='font-semibold text-4xl'>Motion Sensor 1</h1>
					<h1 className='font-semibold text-2xl'>{hardware?.motionSensorValue}</h1>
				</div>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<PiSneakerMoveFill className='text-purple-600 text-7xl' />
					<h1 className='font-semibold text-4xl'>Motion Sensor 2</h1>
					<h1 className='font-semibold text-2xl'>{hardware?.secondMotionSensorValue}</h1>
				</div>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<ImSwitch
						className={`${hardware?.acSwitch ? 'text-green-600' : 'text-red-600'} text-7xl transition-all`}
					/>
					<h1 className='font-semibold text-4xl'>AC Switch</h1>
					<Switch
						onChange={(e) => {
							dispatch(
								updateHardwareAction({
									pk: thisRoom.pk,
									data: {
										acSwitch: e,
										acPumpSwitch: hardware.acPumpSwitch,
										reservedSwitch: hardware.reservedSwitch,
										isShutdown: false,
										isReboot: false,
									},
								})
							)
							setHardware({ ...hardware, acSwitch: e })
						}}
						checked={hardware?.acSwitch}
						style={{ backgroundColor: hardware?.acSwitch ? 'green' : 'red' }}
					/>
				</div>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<ImSwitch
						className={`${
							hardware?.acPumpSwitch ? 'text-green-600' : 'text-red-600'
						} text-7xl transition-all`}
					/>
					<h1 className='font-semibold text-4xl'>AC Pump Switch</h1>
					<Switch
						onChange={(e) => {
							dispatch(
								updateHardwareAction({
									pk: thisRoom.pk,
									data: {
										acSwitch: hardware.acSwitch,
										acPumpSwitch: e,
										reservedSwitch: hardware.reservedSwitch,
										isShutdown: false,
										isReboot: false,
									},
								})
							)
							setHardware({ ...hardware, acPumpSwitch: e })
						}}
						checked={hardware?.acPumpSwitch}
						style={{ backgroundColor: hardware?.acPumpSwitch ? 'green' : 'red' }}
					/>
				</div>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<ImSwitch
						className={`${
							hardware?.reservedSwitch ? 'text-green-600' : 'text-red-600'
						} text-7xl transition-all`}
					/>
					<h1 className='font-semibold text-4xl'>Reserved Switch</h1>
					<Switch
						onChange={(e) => {
							dispatch(
								updateHardwareAction({
									pk: thisRoom.pk,
									data: {
										acSwitch: hardware.acSwitch,
										acPumpSwitch: hardware.acPumpSwitch,
										reservedSwitch: e,
										isShutdown: false,
										isReboot: false,
									},
								})
							)
							setHardware({ ...hardware, reservedSwitch: e })
						}}
						checked={hardware?.reservedSwitch}
						style={{ backgroundColor: hardware?.reservedSwitch ? 'green' : 'red' }}
					/>
				</div>
			</div>
		</div>
	)
}

export default RoomInfo
