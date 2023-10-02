import React from 'react'
import { AiOutlineUser, AiFillLock } from 'react-icons/ai'
import { FaFacebookF, FaYoutube } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

const SignIn = () => {
	const dispatch = useDispatch()
	const formik = useFormik({
		initialValues: {
			taiKhoan: '',
			matKhau: '',
		},
		validationSchema: Yup.object({
			taiKhoan: Yup.string().required('Account is required').min(5, 'Account must have min 5 characters'),

			matKhau: Yup.string().required('Password is required').min(6, 'Password must have min 6 characters'),
		}),
		onSubmit: (values) => {
			// dispatch(actionDangNhap(values))
		},
	})

	return (
		<div className='flex flex-col p-4 h-full w-full'>
			<h1 className='text-4xl text-center'>Sign In</h1>
			<form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 items-center justify-center grow px-10'>
				<div className='w-full'>
					<div className='w-full flex items-center text-xl gap-4 border px-4 py-1'>
						<AiOutlineUser />
						<input
							onChange={formik.handleChange}
							value={formik.values.taiKhoan}
							placeholder='account'
							name='taiKhoan'
							className='focus:outline-none w-full'
							type='text'
						/>
					</div>
					{formik.touched.taiKhoan && formik.errors.taiKhoan ? (
						<span className='text-red-500'>{formik.errors.taiKhoan}</span>
					) : null}
				</div>
				<div className='w-full'>
					<div className='w-full flex items-center text-xl gap-4 border px-4 py-1'>
						<AiFillLock />
						<input
							onChange={formik.handleChange}
							value={formik.values.matKhau}
							placeholder='password'
							name='matKhau'
							className='focus:outline-none w-full'
							type='password'
						/>
					</div>
					{formik.touched.matKhau && formik.errors.matKhau ? (
						<span className='text-red-500'>{formik.errors.matKhau}</span>
					) : null}
				</div>
				<p>
					Don't have an account:
					<NavLink className='text-green-700 font-semibold' to='/sign-up'>
						{' '}
						Sign Up
					</NavLink>
				</p>
				<button type='submit' className='bg-[rgb(102,117,223)] w-full px-4 py-2 font-semibold text-white'>
					Sign In
				</button>
				<div className='flex items-center gap-4 text-xl text-white'>
					<div className='p-2 rounded-full bg-blue-600 cursor-pointer'>
						<FaFacebookF />
					</div>
					<div className='p-2 rounded-full bg-red-600 cursor-pointer'>
						<FaYoutube />
					</div>
				</div>
			</form>
		</div>
	)
}

export default SignIn
