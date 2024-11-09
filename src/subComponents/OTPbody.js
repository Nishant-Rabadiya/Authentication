import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { generateOTP } from '../components/Main'

const getData = async () => {
    const res = await fetch('http://localhost:3031/registrationData');
    let data = await res.json();
    return data
}

export default function OTPbody(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const initialValue = {
        first: '',
        second: '',
        third: '',
        four: ''
    }

    const [otpData, setOtpData] = useState({ ...initialValue })
    const [error, setError] = useState('')

    const handleGoBack = () => {
        navigate(-1);
        localStorage.setItem('OTPEmail', JSON.stringify({ email: '', OTP: '' }));
    };
    const items = JSON.parse(localStorage.getItem('OTPEmail'));

    const handleResendOtp = () => {
        localStorage.setItem('OTPEmail', JSON.stringify({ ...items, OTP: generateOTP() }));
    }

    const inputs = document.querySelectorAll('.otp-input input');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            if (e.target.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value) {
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            }
            if (e.key === 'e') {
                e.preventDefault();
            }
        });
    });

    const inputField = (e) => {
        if (e.target.name === 'first') {
            setOtpData({ ...otpData, first: e.target.value.replace(/[^0-9]/g, '') })
        }
        if (e.target.name === 'second') {
            setOtpData({ ...otpData, second: e.target.value.replace(/[^0-9]/g, '') })
        }
        if (e.target.name === 'third') {
            setOtpData({ ...otpData, third: e.target.value.replace(/[^0-9]/g, '') })
        }
        if (e.target.name === 'four') {
            setOtpData({ ...otpData, four: e.target.value.replace(/[^0-9]/g, '') })
        }
    }

    const verifyButton = async () => {
        const allData = await getData();
        const currData = allData.find(x => x.email === items?.email);
        if (!(items?.OTP.toString() === otpData.first + otpData.second + otpData.third + otpData.four)) {
            setError("Invalid OTP")
        } else {
            setError("")
            if (location.state?.name === "registration") {
                await fetch(`http://localhost:3031/registrationData/${currData.id}/`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ varified: true })
                })
                navigate('/login');
            } else if (location.state?.name === "forgotPassworrd") {
                localStorage.setItem('OTPEmail', JSON.stringify({ ...items, varified: true }));
                navigate('/resetpassword')
            }
        }
    }

    return (
        <form action="">
            <button className="arrow-button" type="button" onClick={handleGoBack}><i className="fa-solid fa-arrow-left"></i></button>

            <div className="otp-heding-section">
                <h2 className="otp-heading">OTP Varification</h2>
                <p className="otp-message">Enter the 4-digit code sent to your Email</p>
                <p className="otp-message">{props.email}</p>
            </div>

            <div className="otp-section otp-input">
                <input className="otp-input-field" maxLength={1} type="text" value={otpData.first} name="first" onChange={inputField} />
                <input className="otp-input-field" maxLength={1} type="text" value={otpData.second} name="second" onChange={inputField} />
                <input className="otp-input-field" maxLength={1} type="text" value={otpData.third} name="third" onChange={inputField} />
                <input className="otp-input-field" maxLength={1} type="text" value={otpData.four} name="four" onChange={inputField} />
                <p className="error-message">{error}</p>
            </div>

            <button className="register-button" type="button" onClick={verifyButton}>Verify OTP</button>
            <div className="resend-text">
                Didn't receive the code?
                <span className="resend-link" onClick={handleResendOtp}>Resend Code</span> <span id="timer"></span>
            </div>
        </form>
    )
}