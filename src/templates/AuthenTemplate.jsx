import React from 'react'
import { Outlet } from 'react-router-dom'

const UserTemplate = () => {
	return (
		<div className='flex min-h-screen justify-center'>
			<div className='w-0 md:w-6/12 bg-[url("https://picsum.photos/2000")] bg-no-repeat bg-cover'></div>
			<div className='w-12/12 md:w-6/12'>
				<Outlet />
			</div>
		</div>
	)
}

export default UserTemplate
