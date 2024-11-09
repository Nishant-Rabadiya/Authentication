import React, { useState } from "react";
import image from '../Assests/image.jpg'
import '../Assests/main.css'
import { useNavigate } from "react-router-dom";

const getData = async () => {
    const res = await fetch('http://localhost:3031/registrationData');
    let data = await res.json();
    return data
}

export default function ResetPassword() {
    const navigate = useNavigate()
    const items = JSON.parse(localStorage.getItem('OTPEmail'));
    const initialValue = {
        newPassword: '',
        confirmPassword: ''
    }
    const initialError = {
        newPassword: '',
        confirmPassword: ''
    }
    const shawAndHidePassword = {
        password: false,
        confirmPassword: false
    }
    const [resetData, setResetData] = useState({ ...initialValue })
    const [error, setError] = useState({ ...initialError })
    const [showPassword, setShowPassword] = useState(false);

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    const handleGoBack = () => {
        navigate(-1);
    };

    const hideShawPasswordButton = () => {
        (showPassword.password) ? setShowPassword({ ...showPassword, password: false }) : setShowPassword({ ...showPassword, password: true })
    }

    const hideShawConfirmPasswordButton = () => {
        (showPassword.confirmPassword) ? setShowPassword({ ...showPassword, confirmPassword: false }) : setShowPassword({ ...showPassword, confirmPassword: true })
    }

    const inputField = (e) => {
        if (e.target.name === 'newPassword') {
            setResetData({ ...resetData, newPassword: e.target.value })
            if (!e.target.value) {
                setError({ ...error, newPassword: 'Please enter your New password' })
            } else if (e.target.value.length < 8) {
                setError({ ...error, password: 'Password must be 8 characters long!' })
            } else if (!passwordPattern.test(e.target.value)) {
                setError({ ...error, newPassword: 'Please enter valid password' })
            } else {
                setError({ ...error, newPassword: '' })
            }
        }

        if (e.target.name === 'confirmPassword') {
            setResetData({ ...resetData, confirmPassword: e.target.value })
            if (!e.target.value) {
                setError({ ...error, confirmPassword: 'Please enter your New password' })
            } else if (e.target.value.length < 8) {
                setError({ ...error, password: 'Password must be 8 characters long!' })
            } else if (!passwordPattern.test(e.target.value)) {
                setError({ ...error, confirmPassword: 'Please enter valid password' })
            } else {
                setError({ ...error, confirmPassword: '' })
            }
        }
    }

    const confirmButton = async () => {
        const allData = await getData()
        let isFlag = false
        if (!resetData.newPassword) {
            initialError.newPassword = 'Please enter your New password'
            setError({ ...initialError })
            isFlag = true;
        } else if (resetData.newPassword < 8) {
            initialError.newPassword = 'Password must be 8 characters long!'
            setError({ ...initialError })
            isFlag = true;
        } else if (!passwordPattern.test(resetData.newPassword)) {
            initialError.newPassword = 'Please enter valid password'
            setError({ ...initialError })
            isFlag = true;
        } else {
            initialError.newPassword = ''
            setError({ ...initialError })
        }

        if (!resetData.confirmPassword) {
            initialError.confirmPassword = 'Please enter your New password'
            setError({ ...initialError })
            isFlag = true;
        } else if (!passwordPattern.test(resetData.confirmPassword)) {
            initialError.confirmPassword = 'Please enter valid password'
            setError({ ...initialError })
            isFlag = true;
        } else if (!(resetData.newPassword === resetData.confirmPassword)) {
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

        const currData = allData.find(x => x?.email === items?.email)
        if (items.varified) {
            localStorage.setItem('OTPEmail', JSON.stringify({ email: '', OTP: '' }));
            await fetch(`http://localhost:3031/registrationData/${currData.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: resetData.newPassword })
            })

            navigate('/login')
        } else {
            alert('Email is not varified')
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
                        <button className="arrow-button" type="button" onClick={handleGoBack}><i className="fa-solid fa-arrow-left"></i></button>

                        {/* <h2 className="login-heading">Let's login to your</h2> */}
                        <h2 className="login-heading login-bottom-heading">Reset Password</h2>

                        <p className="form-title input-field-heading">Email</p>
                        <input className="input-field" value={items?.email} type="text" disabled />
                        <p className="error-message"></p>

                        <p className="form-title input-field-heading">New Password</p>
                        <input className="password-input-field" type={showPassword.password ? "text" : "password"} name="newPassword" onChange={inputField} placeholder="Enter your New password" /><span className="password-hide-shaw-icon" onClick={hideShawPasswordButton}>{!showPassword.password ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</span>
                        <p className="error-message">{error.newPassword}</p>

                        <p className="form-title input-field-heading">Confirm password</p>
                        <input className="password-input-field" type={showPassword.confirmPassword ? "text" : "password"} name="confirmPassword" onChange={inputField} placeholder="Re-enter your password" /><span className="password-hide-shaw-icon" onClick={hideShawConfirmPasswordButton}>{!showPassword.confirmPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</span>
                        <p className="error-message">{error.confirmPassword}</p>
                        {/* 
                        <div className="forgot-password-section">
                            <button className="forgot-password-button">Forgot Password</button>
                        </div> */}

                        <button className="register-button" type="button" onClick={confirmButton}>Confirm</button>

                        {/* <p className="form-footer">Already have an account? Register Here</p> */}
                    </form>
                </div>
            </div>
        </div>
    )
}