import axios from 'axios'
import { ACCESS_TOKEN, LINK_API } from '../utils/constant'

const roomService = {
	getAllRoomsOfUser(data) {
		return axios({
			url: `${LINK_API}/room/of-user/${data}`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	getAllRooms() {
		return axios({
			url: `${LINK_API}/room/all`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	updateHardware(payload) {
		return axios({
			url: `${LINK_API}/room/updateHardware/${payload.pk}`,
			method: 'PUT',
			data: payload.data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
}

export default roomService
