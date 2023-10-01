// import React, { useState } from "react";
// import { Link } from 'react-router-dom';


// const initFormValue = {
//     email:"",
//     password: ""
// };

// const isEmptyValue = (value) => {
//     return !value || value.trim().length < 1;
// };

// const isEmptyValid = (email) => {
//     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
// };

// export default function LoginPage() {
//     const [formValue, setFormValue] = useState(initFormValue);
//     const [formError, setFormError] = useState({});

//     const validateForm = () => {
//         const error = {};

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


//     const handleRegisterClick = () => {

//         window.location.href = '/register';
//       };

//     return  (
//         <div className="login-page">
//         <div className="login-form-container">
//             <h1 className="title">Login accout</h1>
        
//             <form onSubmit={handleSubmit}>
//                 <div className="lg-2">
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

//                 <div className="lg-2">
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
//                 <Link to="/register" className="register-btn" onClick={handleRegisterClick}>Register</Link>


//                 <button type="submit" className="submit-btn">Login
//                 </button>

                
//             </form>
//         </div>
//     </div>
//     )    
// }



import React from 'react'
import { AiOutlineUser, AiFillLock } from 'react-icons/ai'
import { FaFacebookF, FaYoutube } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
// import { actionDangNhap } from 'redux/actions/thunkActions/actionUser'

const SignIn = () => {
	// const dispatch = useDispatch()
	const formik = useFormik({
		initialValues: {
			taiKhoan: '',
			matKhau: '',
		},
		validationSchema: Yup.object({
			taiKhoan: Yup.string().required('Account is required').min(6, 'Account must have min 5 characters'),

			matKhau: Yup.string().required('Password is required').min(8, 'Password must have min 6 characters'),
		}),
		// onSubmit: (values) => {
		// 	dispatch(actionDangNhap(values))
		// },
	})
    const handleRegisterClick = () => {

                 window.location.href = '/sign-up';
               };

	return (
		<div className='h-screen flex justify-center items-center'>
            <div className='w-520px p-48 shadow-md bg-white'>
                <h1 className='text-3xl text-center m-4'>Sign In</h1>
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
                        <NavLink className='text-green-700 font-semibold' to='/sign-up' onClick={handleRegisterClick}>
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
		</div>
	)
}

export default SignIn
