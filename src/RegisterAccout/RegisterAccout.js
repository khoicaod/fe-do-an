import React, { useState } from "react";
import { Link } from 'react-router-dom';


const initFormValue = {
    firstName: "",
    lastName: "",
    email:"",
    password: "",
    confirmPassword: "",
};

const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};

const isEmptyValid = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export default function RegisterPage() {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({});

    const validateForm = () => {
        const error = {};

        if (isEmptyValue(formValue.firstName)) {
            error["firstName"] = "First Name is required";
        }
        if (isEmptyValue(formValue.lastName)) {
            error["lastName"] = "Last Name is required";
        }
        if (isEmptyValue(formValue.email)) {
            error["email"] = "Email is required";
        } else {
            if (!isEmptyValid(formValue.email)) {
                error["email"] = "Email is invalid";
        }
    }
        if (isEmptyValue(formValue.password)) {
            error["password"] = "Password is required";
        }
        if (isEmptyValue(formValue.confirmPassword)) {
            error["confirmPassword"] = "ConfirmPassword is required";
        } else if (formValue.confirmPassword !== formValue.password) {
            error["confirmPassword"] = "Confirm Password not match";
        }

        setFormError(error);
        return Object.keys(error).length === 0;
    }

    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,  
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            console.log("form value", formValue);

        }
        else{
            console.log("form invalid");
        }
    };

    console.log(formError);

    const handleBackClick = () => {

        window.location.href = '/';
      };

    return  (
        <div className="register-page">
        <div className="register-form-container">
            <h1 className="title">Register accout</h1>
        
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlfor="first-name" className="form-label">
                        First Name
                    </label>
                    <input 
                        id="first-name"
                        className="form-control"
                        type="text"
                        name="firstName"
                        value={formValue.firstName}
                        onChange={handleChange}
                    />
                    {formError.firstName && (
                        <div className="error-feedback">{formError.firstName}</div>
                    )}
                </div>

                <div className="mb-2">
                    <label htmlfor="last-name" className="form-label">
                        Last Name
                    </label>
                    <input 
                        id="last-name"
                        className="form-control"
                        type="text"
                        name="lastName"
                        value={formValue.lastName}
                        onChange={handleChange}                    
                    />
                    {formError.lastName && (
                        <div className="error-feedback">{formError.lastName}</div>
                    )}
                </div>

                <div className="mb-2">
                    <label htmlfor="email" className="form-label">
                        Email
                    </label>
                    <input 
                        id="email"
                        className="form-control"
                        type="text"
                        name="email"
                        value={formValue.email}
                        onChange={handleChange}
                    />
                    {formError.email && (
                        <div className="error-feedback">{formError.email}</div>
                    )}
                </div>

                <div className="mb-2">
                    <label htmlfor="password" className="form-label">
                        Password
                    </label>
                    <input 
                        id="password"
                        className="form-control"
                        type="password"
                        name="password"
                        value={formValue.password}
                        onChange={handleChange}
                    />
                    {formError.password && (
                        <div className="error-feedback">{formError.password}</div>
                    )}
                </div>

                <div className="mb-2">
                    <label htmlfor="confirm-password" className="form-label">
                        Confirm Password
                    </label>
                    <input 
                        id="confirm-password"
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        value={formValue.confirmPassword}
                        onChange={handleChange}
                    />
                    {formError.confirmPassword && (
                        <div className="error-feedback">{formError.confirmPassword}</div>
                    )}
                </div>

                <Link to="/" className="back-to-login-btn" onClick={handleBackClick}>Back</Link>

                <button type="submit" className="submit-btn">Register
                </button>

                
            </form>
        </div>
    </div>
    )    
}

