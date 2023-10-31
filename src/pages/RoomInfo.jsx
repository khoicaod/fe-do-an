import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import SockJS from 'sockjs-client'
import { DAYS_OF_WEEK, LINK_API } from '../utils/constant'
import { over } from 'stompjs'
import { FaFireFlameCurved, FaGaugeSimpleHigh, FaTemperatureHalf } from 'react-icons/fa6'
import { MdOutlineElectricalServices } from 'react-icons/md'
import { WiHumidity } from 'react-icons/wi'
import { MdGasMeter } from 'react-icons/md'
import { ImSwitch } from 'react-icons/im'
import { Switch } from 'antd'
import { getHardwareUpdateHistories, updateHardwareAction } from '../redux/actions/roomAction'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

const defaultHardwareValue = {
	gasSensorValue: 'N/A',
	flameSensorValue: 'N/A',
	pressureSensorValue: 'N/A',
	ampSensorValue: 'N/A',
	temperatureSensorValue: 'N/A',
	humiditySensorValue: 'N/A',
	secondAmpSensorValue: 'N/A',
	acSwitch: false,
	acPumpSwitch: false,
	reservedSwitch: false,
	updatedOn: 'N/A',
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
	},
}

const RoomInfo = () => {
	const { myRooms, hardwareHistories } = useSelector((state) => state.roomReducer)
	const dispatch = useDispatch()

	const pathVariable = useParams().token

	const [hardware, setHardware] = useState()
	const [thisRoom, setThisRoom] = useState()
	const [week, setWeek] = useState(0)

	useEffect(() => {
		setHardware(defaultHardwareValue)

		const socket = new SockJS(LINK_API + '/ws/registry')
		const stompClient = over(socket)
		stompClient.connect({}, () => {
			console.log('success')
			stompClient.subscribe(`/ws/topic/${pathVariable}`, (response) => {
				const data = JSON.parse(response.body)
				setHardware(data)
			})
		})
		if (myRooms.length > 0) {
			const thisRoom = myRooms.find((room) => room.token === pathVariable)
			dispatch(getHardwareUpdateHistories({ roomPk: thisRoom.pk, week }))
			setThisRoom(thisRoom)
		}
		return () => {
			if (stompClient.connected) {
				stompClient.disconnect()
			}
		}
	}, [pathVariable, myRooms.length, week])

	const data = {
		labels: DAYS_OF_WEEK.map((day) => day.display),
		datasets: [
			{
				label: 'gasSensorValue',
				data: DAYS_OF_WEEK.map((day) => {
					const dayFound = hardwareHistories.find((item) => item.dateOfWeek === day.value)
					return dayFound?.gasSensorValue
				}),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(142, 68, 199, 0.5)',
			},
			{
				label: 'flameSensorValue',
				data: DAYS_OF_WEEK.map((day) => {
					const dayFound = hardwareHistories.find((item) => item.dateOfWeek === day.value)
					return dayFound?.flameSensorValue
				}),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(55, 217, 98, 0.5)',
			},
			{
				label: 'pressureSensorValue',
				data: DAYS_OF_WEEK.map((day) => {
					const dayFound = hardwareHistories.find((item) => item.dateOfWeek === day.value)
					return dayFound?.pressureSensorValue
				}),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(201, 45, 67, 0.5)',
			},
			{
				label: 'ampSensorValue',
				data: DAYS_OF_WEEK.map((day) => {
					const dayFound = hardwareHistories.find((item) => item.dateOfWeek === day.value)
					return dayFound?.ampSensorValue
				}),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(33, 150, 234, 0.5)',
			},
			{
				label: 'secondAmpSensorValue',
				data: DAYS_OF_WEEK.map((day) => {
					const dayFound = hardwareHistories.find((item) => item.dateOfWeek === day.value)
					return dayFound?.secondAmpSensorValue
				}),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 128, 0, 0.5)',
			},
			{
				label: 'temperatureSensorValue',
				data: DAYS_OF_WEEK.map((day) => {
					const dayFound = hardwareHistories.find((item) => item.dateOfWeek === day.value)
					return dayFound?.temperatureSensorValue
				}),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(82, 184, 71, 0.5)',
			},
			{
				label: 'humiditySensorValue',
				data: DAYS_OF_WEEK.map((day) => {
					const dayFound = hardwareHistories.find((item) => item.dateOfWeek === day.value)
					return dayFound?.humiditySensorValue
				}),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(240, 62, 126, 0.5)',
			},
		],
	}

	return (
		<div className='flex flex-col gap-4 p-8 shadow-slate-600 shadow-lg rounded-2xl'>
			<h1 className='text-4xl'>Statistics for the week</h1>
			<Bar options={options} data={data} />
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
					<MdOutlineElectricalServices className='text-green-700 text-7xl' />
					<h1 className='font-semibold text-4xl'>Ampere Sensor 1</h1>
					<h1 className='font-semibold text-2xl'>{hardware?.ampSensorValue}</h1>
				</div>
				<div className='h-64 bg-violet-400 rounded-2xl flex flex-col gap-4 items-center justify-center shadow-lg shadow-slate-600'>
					<MdOutlineElectricalServices className='text-purple-600 text-7xl' />
					<h1 className='font-semibold text-4xl'>Ampere Sensor 2</h1>
					<h1 className='font-semibold text-2xl'>{hardware?.secondAmpSensorValue}</h1>
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
