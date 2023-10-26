import { Table } from 'antd'
import React, { useEffect } from 'react'
import { getAllUserAction } from '../redux/actions/userAction'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

const UserManagement = () => {
	const dispatch = useDispatch()
	const { users } = useSelector((state) => state.userReducer)

	useEffect(() => {
		dispatch(getAllUserAction())
	}, [])

	const columns = [
		{
			title: 'Username',
			dataIndex: 'username',
		},
		{
			title: 'Role',
			dataIndex: 'role',
		},
		{
			title: 'Full Name',
			dataIndex: 'fullName',
		},
		{
			title: 'Phone Number',
			dataIndex: 'phoneNumber',
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Address',
			dataIndex: 'address',
		},
		{
			title: 'Delete / Edit',
			render(text, record) {
				return (
					<div className='flex gap-4 justify-center'>
						<span
							onClick={() => {
								if (window.confirm('Bạn muốn xóa phim này ?') === true) {
									// dispatch(actionXoaPhim(record.maPhim))
								}
							}}
							className='text-red-500 cursor-pointer text-2xl'>
							<AiFillDelete />
						</span>
						<span
							// onClick={() => navigate(`edit-film/${record.maPhim}`)}
							className='text-blue-500 cursor-pointer text-2xl'>
							<AiFillEdit />
						</span>
					</div>
				)
			},
		},
	]

	return (
		<div className='flex flex-col gap-8'>
			<h1 className='text-4xl font-semibold'>User Management</h1>
			<Table
				rowKey={(record) => {
					return record.pk
				}}
				bordered
				columns={columns}
				dataSource={users}
			/>
		</div>
	)
}

export default UserManagement
