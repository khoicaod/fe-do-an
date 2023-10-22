import axios from 'axios'
import { ACCESS_TOKEN, LINK_API } from '../utils/constant'

const userService = {
	getMyInfo() {
		return axios({
			url: `${LINK_API}/user/my-info`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	getAllUser() {
		return axios({
			url: `${LINK_API}/user/all`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
}

export default userService
