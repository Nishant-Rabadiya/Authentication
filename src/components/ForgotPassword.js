import React, { useState } from "react";
import image from '../Assests/image.jpg'
import '../Assests/main.css'
import { Link, useNavigate } from "react-router-dom";
import { generateOTP } from './Main'

const getData = async () => {
    const res = await fetch('http://localhost:3031/registrationData');
    let data = await res.json();
    return data
}

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const emailPattern = /^[a-z0-9]+@[a-z0-9]+\.[a-zA-Z]{2,4}$/;

    const inputField = (e) => {
        setEmail(e.target.value)
        if (!e.target.value) {
            setError('Please enter your email')
        } else if (!emailPattern.test(e.target.value)) {
            setError('Please enter valid email')
        } else {
            setError('')
        }
    }

    const otpButton = async () => {
        const allData = await getData();
        let isFlag = false
        if (!email) {
            setError('Please enter your email')
            isFlag = true
        } else if (!emailPattern.test(email)) {
            setError('Please enter valid email')
            isFlag = true
        } else if (!allData.find(x => x.email === email)) {
            setError('Email is not existed')
            isFlag = true
        } else {
            setError('')
        }

        if (isFlag) {
            return
        }

        localStorage.setItem('OTPEmail', JSON.stringify({ email: email, OTP: generateOTP(), varified : false }));
        navigate('/otp', {state: { name: 'forgotPassworrd' }})

    }

    return (
        <div className="main-section">
            <div className="left-side-section">
                <img className="left-image" src={image} alt="" />
            </div>

            <div className="right-side-section">
                <div className="form-section">
                    <form action="">
                        <Link to='/login'><button className="arrow-button"><i className="fa-solid fa-arrow-left"></i></button></Link>

                        <h2 className="login-heading login-bottom-heading">Forgot Password</h2>

                        <p className="form-title input-field-heading">Email</p>
                        <input className="input-field" value={email} type="email" onChange={inputField} placeholder="Enter your email" />
                        <p className="error-message">{error}</p>

                        {/* <div className="otp-heding-section">
                            <h2 className="otp-heading">OTP Varification</h2>
                            <p className="otp-message">Enter the 4-digit code sent to your device</p>
                        </div>

                        <div className="otp-section">
                            <input className="otp-input-field" type="text" />
                            <input className="otp-input-field" type="text" />
                            <input className="otp-input-field" type="text" />
                            <input className="otp-input-field" type="text" />
                        </div>
                        <p className="error-message">Error</p> */}

                        <button className="register-button" type="button" onClick={otpButton}>Send OTP</button>

                    </form>
                </div>
            </div>
        </div>
    )
}