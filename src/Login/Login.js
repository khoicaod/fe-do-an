import React, { useState } from "react";
import { Link } from 'react-router-dom';


const initFormValue = {
    email:"",
    password: ""
};

const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};

const isEmptyValid = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export default function LoginPage() {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({});

    const validateForm = () => {
        const error = {};

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


    const handleRegisterClick = () => {

        window.location.href = '/register';
      };

    return  (
        <div className="login-page">
        <div className="login-form-container">
            <h1 className="title">Login accout</h1>
        
            <form onSubmit={handleSubmit}>
                <div className="lg-2">
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

                <div className="lg-2">
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
                <Link to="/register" className="register-btn" onClick={handleRegisterClick}>Register</Link>


                <button type="submit" className="submit-btn">Login
                </button>

                
            </form>
        </div>
    </div>
    )    
}
