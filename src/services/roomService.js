import axios from 'axios'
import { ACCESS_TOKEN, LINK_API } from '../utils/constant'

const roomService = {
	getAllRoomsOfUser(data) {
		return axios({
			url: `${LINK_API}/room/of-user/${data}`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
}

export default roomService
