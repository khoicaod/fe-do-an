import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import SockJS from 'sockjs-client'
import { LINK_API } from '../utils/constant'
import { over } from 'stompjs'
import { Switch } from 'antd'

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

	const pathVariable = useParams().token

	const stompClientRef = useRef(null)

	const [hardware, setHardware] = useState()
	const [thisRoom, setThisRoom] = useState()

	useEffect(() => {
		setHardware(defaultHardwareValue)

		const socket = new SockJS(LINK_API + '/ws/registry')
		const stompClient = over(socket)
		stompClient.connect({}, () => {
			stompClientRef.current = stompClient
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
			<h1>Status: {thisRoom?.isUsed ? 'ACTIVE' : 'IN ACTIVE'}</h1>
			<ul>
				<li>
					<strong>Gas Sensor Value:</strong> {hardware?.gasSensorValue}
				</li>
				<li>
					<strong>Flame Sensor Value:</strong> {hardware?.flameSensorValue}
				</li>
				<li>
					<strong>Pressure Sensor Value:</strong> {hardware?.pressureSensorValue}
				</li>
				<li>
					<strong>Motion Sensor Value:</strong> {hardware?.motionSensorValue}
				</li>
				<li>
					<strong>Temperature Sensor Value:</strong> {hardware?.temperatureSensorValue}
				</li>
				<li>
					<strong>Humidity Sensor Value:</strong> {hardware?.humiditySensorValue}
				</li>
				<li>
					<strong>Second Motion Sensor Value:</strong> {hardware?.secondMotionSensorValue}
				</li>
				<li>
					<strong>AC Switch:</strong>{' '}
					<Switch
						onChange={(e) => {
							stompClientRef.current.send(
								`/ws/hardware/button/${pathVariable}`,
								{},
								JSON.stringify({ ...hardware, acSwitch: e })
							)
							setHardware({ ...hardware, acSwitch: e })
						}}
						id='acSwitch'
						style={{ backgroundColor: hardware?.acSwitch ? 'green' : 'orange' }}
						checked={hardware?.acSwitch}
					/>
				</li>
				<li>
					<strong>AC Pump Switch:</strong>{' '}
					<Switch
						onChange={(e) => {
							stompClientRef.current.send(
								`/ws/hardware/button/${pathVariable}`,
								{},
								JSON.stringify({ ...hardware, acPumpSwitch: e })
							)
							setHardware({ ...hardware, acPumpSwitch: e })
						}}
						style={{ backgroundColor: hardware?.acPumpSwitch ? 'green' : 'orange' }}
						checked={hardware?.acPumpSwitch}
					/>
				</li>
				<li>
					<strong>Reserved Switch:</strong>{' '}
					<Switch
						onChange={(e) => {
							stompClientRef.current.send(
								`/ws/hardware/button/${pathVariable}`,
								{},
								JSON.stringify({ ...hardware, reservedSwitch: e })
							)
							setHardware({ ...hardware, reservedSwitch: e })
						}}
						style={{ backgroundColor: hardware?.reservedSwitch ? 'green' : 'orange' }}
						checked={hardware?.reservedSwitch}
					/>
				</li>
				<li>
					<strong>Updated On:</strong> {hardware?.updatedOn}
				</li>
			</ul>
		</div>
	)
}

export default RoomInfo
