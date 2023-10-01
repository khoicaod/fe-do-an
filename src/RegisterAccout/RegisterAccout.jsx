// import React, { useState } from "react";
// import { Link } from 'react-router-dom';


// const initFormValue = {
//     firstName: "",
//     lastName: "",
//     email:"",
//     password: "",
//     confirmPassword: "",
// };

// const isEmptyValue = (value) => {
//     return !value || value.trim().length < 1;
// };

// const isEmptyValid = (email) => {
//     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
// };

// export default function RegisterPage() {
//     const [formValue, setFormValue] = useState(initFormValue);
//     const [formError, setFormError] = useState({});

//     const validateForm = () => {
//         const error = {};

//         if (isEmptyValue(formValue.firstName)) {
//             error["firstName"] = "First Name is required";
//         }
//         if (isEmptyValue(formValue.lastName)) {
//             error["lastName"] = "Last Name is required";
//         }
//         if (isEmptyValue(formValue.email)) {
//             error["email"] = "Email is required";
//         } else {
//             if (!isEmptyValid(formValue.email)) {
//                 error["email"] = "Email is invalid";
//         }
//     }
//         if (isEmptyValue(formValue.password)) {
//             error["password"] = "Password is required";
//         }
//         if (isEmptyValue(formValue.confirmPassword)) {
//             error["confirmPassword"] = "ConfirmPassword is required";
//         } else if (formValue.confirmPassword !== formValue.password) {
//             error["confirmPassword"] = "Confirm Password not match";
//         }

//         setFormError(error);
//         return Object.keys(error).length === 0;
//     }

//     const handleChange = (event) => {
//         const { value, name } = event.target;
//         setFormValue({
//             ...formValue,
//             [name]: value,  
//         });
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         if (validateForm()) {
//             console.log("form value", formValue);

//         }
//         else{
//             console.log("form invalid");
//         }
//     };

//     console.log(formError);

//     const handleBackClick = () => {

//         window.location.href = '/';
//       };

//     return  (
//         <div className="register-page">
//         <div className="register-form-container">
//             <h1 className="title">Register accout</h1>
        
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-2">
//                     <label htmlfor="first-name" className="form-label">
//                         First Name
//                     </label>
//                     <input 
//                         id="first-name"
//                         className="form-control"
//                         type="text"
//                         name="firstName"
//                         value={formValue.firstName}
//                         onChange={handleChange}
//                     />
//                     {formError.firstName && (
//                         <div className="error-feedback">{formError.firstName}</div>
//                     )}
//                 </div>

//                 <div className="mb-2">
//                     <label htmlfor="last-name" className="form-label">
//                         Last Name
//                     </label>
//                     <input 
//                         id="last-name"
//                         className="form-control"
//                         type="text"
//                         name="lastName"
//                         value={formValue.lastName}
//                         onChange={handleChange}                    
//                     />
//                     {formError.lastName && (
//                         <div className="error-feedback">{formError.lastName}</div>
//                     )}
//                 </div>

//                 <div className="mb-2">
//                     <label htmlfor="email" className="form-label">
//                         Email
//                     </label>
//                     <input 
//                         id="email"
//                         className="form-control"
//                         type="text"
//                         name="email"
//                         value={formValue.email}
//                         onChange={handleChange}
//                     />
//                     {formError.email && (
//                         <div className="error-feedback">{formError.email}</div>
//                     )}
//                 </div>

//                 <div className="mb-2">
//                     <label htmlfor="password" className="form-label">
//                         Password
//                     </label>
//                     <input 
//                         id="password"
//                         className="form-control"
//                         type="password"
//                         name="password"
//                         value={formValue.password}
//                         onChange={handleChange}
//                     />
//                     {formError.password && (
//                         <div className="error-feedback">{formError.password}</div>
//                     )}
//                 </div>

//                 <div className="mb-2">
//                     <label htmlfor="confirm-password" className="form-label">
//                         Confirm Password
//                     </label>
//                     <input 
//                         id="confirm-password"
//                         className="form-control"
//                         type="password"
//                         name="confirmPassword"
//                         value={formValue.confirmPassword}
//                         onChange={handleChange}
//                     />
//                     {formError.confirmPassword && (
//                         <div className="error-feedback">{formError.confirmPassword}</div>
//                     )}
//                 </div>

//                 <Link to="/" className="back-to-login-btn" onClick={handleBackClick}>Back</Link>

//                 <button type="submit" className="submit-btn">Register
//                 </button>

                
//             </form>
//         </div>
//     </div>
//     )    
// }



import React from 'react'
import { AiOutlineUser, AiFillLock, AiFillPhone } from 'react-icons/ai'
import { FaFacebookF, FaYoutube } from 'react-icons/fa'
import { BiRename } from 'react-icons/bi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
// import { GROUP_ID } from 'utils/constants/user'
// import { actionDangKy } from 'redux/actions/thunkActions/actionUser'

const SignUp = () => {
	// const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			taiKhoan: '',
			matKhau: '',
			email: '',
			soDt: '',
			// maNhom: GROUP_ID,
			hoTen: '',
		},
		validationSchema: Yup.object({
			taiKhoan: Yup.string()
				.required('Account is required')
				.min(5, 'Account must have min 5 characters'),
			email: Yup.string().email('Invalid email address').required('Email is required'),
			matKhau: Yup.string()
				.required('Password is required')
				.min(6, 'Password must have min 6 characters'),
			hoTen: Yup.string()
				.required('Name is required')
				.min(3, 'Name must have min 3 characters')
				.max(18, 'Name must have max 18 characters'),
			soDt: Yup.string()
				.required('Phone number is required')
				.length(10, 'Phone number must have 10 numbers')
				.matches(
					/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
					'Phone number is invalid'
				),
		}),
		// onSubmit: (values) => {
		// 	dispatch(actionDangKy(values))
		// },
	})

	return (
		<div className='h-screen flex justify-center items-center'>
            <div className='w-520px p-48 shadow-md bg-white'>

                <h1 className='text-4xl text-center m-4'>Sign Up</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className='flex flex-col gap-4 items-center justify-center grow px-10 '>
                    <div className='w-full  '>
                        <div className='w-full flex items-center text-xl gap-4 border px-24 py-1'>
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
                    <div className='w-full'>
                        <div className='w-full flex items-center text-xl gap-4 border px-4 py-1'>
                            <AiOutlineUser />
                            <input
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                placeholder='email'
                                name='email'
                                className='focus:outline-none w-full'
                                type='email'
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <span className='text-red-500'>{formik.errors.email}</span>
                        ) : null}
                    </div>
                    <div className='w-full'>
                        <div className='w-full flex items-center text-xl gap-4 border px-4 py-1'>
                            <BiRename />
                            <input
                                onChange={formik.handleChange}
                                value={formik.values.hoTen}
                                placeholder='Name'
                                name='hoTen'
                                className='focus:outline-none w-full'
                                type='text'
                            />
                        </div>
                        {formik.touched.hoTen && formik.errors.hoTen ? (
                            <span className='text-red-500'>{formik.errors.hoTen}</span>
                        ) : null}
                    </div>
                    <div className='w-full'>
                        <div className='w-full flex items-center text-xl gap-4 border px-4 py-1'>
                            <AiFillPhone />
                            <input
                                onChange={formik.handleChange}
                                value={formik.values.soDt}
                                placeholder='Phone Number'
                                name='soDt'
                                className='focus:outline-none w-full'
                                type='text'
                            />
                        </div>
                        {formik.touched.soDt && formik.errors.soDt ? (
                            <span className='text-red-500'>{formik.errors.soDt}</span>
                        ) : null}
                    </div>
                    <p>
                        Have an account:
                        <NavLink className='text-green-700 font-semibold' to='/sign-in'>
                            {' '}
                            Sign In
                        </NavLink>
                    </p>
                    <button
                        type='submit'
                        className='bg-[rgb(102,117,223)] w-full px-4 py-2 font-semibold text-white'>
                        Sign Up
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
		</div>
	)
}

export default SignUp
