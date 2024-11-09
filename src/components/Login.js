import React, { useState } from "react";
import image from '../Assests/image.jpg';
import '../Assests/main.css';

import { Link, useNavigate } from "react-router-dom";

const getData = async () => {
    const res = await fetch('http://localhost:3031/registrationData');
    let data = await res.json();
    return data;
}

export default function Login() {
    const navigate = useNavigate();
    const initialValue = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const initialError = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [loginData, setLoginData] = useState({ ...initialValue })
    const [error, setError] = useState({ ...initialError })
    const [showPassword, setShowPassword] = useState(false);

    const hideShawPasswordButton = () => {
        (showPassword.password) ? setShowPassword({ ...showPassword, password: false }) : setShowPassword({ ...showPassword, password: true })
    }

    const hideShawConfirmPasswordButton = () => {
        (showPassword.confirmPassword) ? setShowPassword({ ...showPassword, confirmPassword: false }) : setShowPassword({ ...showPassword, confirmPassword: true })
    }

    const emailPattern = /^[a-z0-9]+@[a-z0-9]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    const inputField = (e) => {
        if (e.target.name === 'email') {
            setLoginData({ ...loginData, email: e.target.value });
            if (!e.target.value) {
                setError({ ...error, email: 'Please enter your email' });
            } else if (!emailPattern.test(e.target.value)) {
                setError({ ...error, email: 'Please enter valid email' });
            } else {
                setError({ ...error, email: '' });
            }
        }

        if (e.target.name === 'password') {
            setLoginData({ ...loginData, password: e.target.value });
            if (!e.target.value) {
                setError({ ...error, password: 'Please enter your password' });
            } else if (e.target.value.length < 8) {
                setError({ ...error, password: 'Password must be 8 characters long!' });
            } else if (!passwordPattern.test(e.target.value)) {
                setError({ ...error, password: 'Please enter valid password' });
            } else {
                setError({ ...error, password: '' });
            }
        }

        if (e.target.name === 'confirmPassword') {
            setLoginData({ ...loginData, confirmPassword: e.target.value });
            if (!e.target.value) {
                setError({ ...error, confirmPassword: 'Please enter your password' });
            } else {
                setError({ ...error, confirmPassword: '' });
            }
        }
    }

    const loginButton = async () => {
        const allData = await getData()
        let isFlag = false;
        if (!loginData.email) {
            initialError.email = 'Please enter your email';
            setError({ ...initialError })
            isFlag = true;
        } else if (!emailPattern.test(loginData.email)) {
            initialError.email = 'Please enter valid email';
            setError({ ...initialError })
            isFlag = true;
        } else if (!allData.find(x => x.email === loginData.email)) {
            initialError.email = `Email doesn't match`;
            setError({ ...initialError })
            isFlag = true;
        } else {
            initialError.email = ``;
            setError({ ...initialError })
        }

        if (!loginData.password) {
            initialError.password = 'Please enter your New password'
            setError({ ...initialError })
            isFlag = true;
        } else if (loginData.password < 8) {
            initialError.password = 'Password must be 8 characters long!'
            setError({ ...initialError })
            isFlag = true;
        } else if (!allData?.find(x => x.email === loginData.email && x.password === loginData.password)) {
            initialError.password = `Password doesn't match`;
            setError({ ...initialError })
            isFlag = true;
        } else if (!passwordPattern.test(loginData.password)) {
            initialError.password = 'Please enter valid password'
            setError({ ...initialError })
            isFlag = true;
        } else {
            initialError.password = ''
            setError({ ...initialError })
        }


        if (!loginData.confirmPassword) {
            initialError.confirmPassword = 'Please enter your New password'
            setError({ ...initialError })
            isFlag = true;
        } else if (!passwordPattern.test(loginData.confirmPassword)) {
            initialError.confirmPassword = 'Please enter valid password'
            setError({ ...initialError })
            isFlag = true;
        } else if (!(loginData.password === loginData.confirmPassword)) {
            initialError.confirmPassword = `Password doesn't match`
            setError({ ...initialError })
            isFlag = true;
        } else {
            initialError.confirmPassword = ''
            setError({ ...initialError })
        }

        if (isFlag) {
            return
        }

        const currData = allData.find(x => x.email === loginData.email);
        if (currData.email === loginData.email && currData.password === loginData.password && currData.varified) {
            localStorage.setItem('loginData', JSON.stringify({ email: loginData.email }));
            navigate('/dashboard')
        } else {
            alert('Account is not varified')
        }
    }


    return (
        <div className="main-section">
            <div className="left-side-section">
                <img className="left-image" src={image} alt="" />
            </div>

            <div className="right-side-section">
                <div className="form-section">
                    <form action="">
                        <h2 className="login-heading">Let's login to your</h2>
                        <h2 className="login-heading login-bottom-heading">Finlab account first</h2>

                        <p className="form-title input-field-heading">Email</p>
                        <input className="input-field" type="text" name="email" value={loginData.email} onChange={inputField} placeholder="Enter your email" />
                        <p className="error-message">{error.email}</p>

                        <p className="form-title input-field-heading">Password</p>
                        <input className="password-input-field" type={showPassword.password ? "text" : "password"} name="password" value={loginData.password} onChange={inputField} placeholder="Enter your password" /><span className="password-hide-shaw-icon" onClick={hideShawPasswordButton}>{!showPassword.password ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</span>
                        <p className="error-message">{error.password}</p>

                        <p className="form-title input-field-heading">Confirm password</p>
                        <input className="password-input-field" type={showPassword.confirmPassword ? "text" : "password"} name="confirmPassword" value={loginData.confirmPassword} onChange={inputField} placeholder="Re-enter your password" /><span className="password-hide-shaw-icon" onClick={hideShawConfirmPasswordButton}>{!showPassword.confirmPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</span>
                        <p className="error-message">{error.confirmPassword}</p>

                        <div className="forgot-password-section">
                            <div className="checkbox-section">
                                <input type="checkbox"/>
                                <label className="checkbox-name"> Remember me</label>
                            </div>
                            <Link to='/forgotpassword'><button className="forgot-password-button">Forgot Password</button></Link>
                        </div>

                        <button className="register-button" type="button" onClick={loginButton}>Login</button>

                        <p className="form-footer">Already have an account? <Link to='/'><span className="redirect-button">Register Here</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}