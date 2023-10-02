import axios from 'axios'
import { ACCESS_TOKEN, LINK_API } from '../utils/constant'

const authenServices = {
	signIn(data) {
		return axios({
			url: `${LINK_API}/auth/sign-in`,
			method: 'POST',
			data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},

	signUp(data) {
		return axios({
			url: `${LINK_API}/auth/sign-up`,
			method: 'POST',
			data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
}

export default authenServices
