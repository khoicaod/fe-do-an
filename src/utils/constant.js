// 'http://14.186.17.158:8080'
// 'http://localhost:8080'

export const LINK_API = 'http://14.186.17.158:8080'

export const ACCESS_TOKEN = 'ACCESS_TOKEN'

export const ROLE = 'ROLE'

export const USER_ID = 'USER_ID'

export const ADMIN_ROLE = 'ADMIN'

export const USER_ROLE = 'USER'

export const DAYS_OF_WEEK = [
	{ display: 'Monday', value: 0 },
	{ display: 'Tuesday', value: 1 },
	{ display: 'Wednesday', value: 2 },
	{ display: 'Thursday', value: 3 },
	{ display: 'Friday', value: 4 },
	{ display: 'Saturday', value: 5 },
	{ display: 'Sunday', value: 6 },
]

export const HOURS_IN_DAY = Array.from({ length: 24 }, (_, i) => i)

export const DAYS_IN_MONTH = Array.from({ length: 31 }, (_, i) => i + 1)

export const MONTHS_IN_YEAR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
