import React, { useState } from "react";
import image from '../Assests/image.jpg'
import '../Assests/main.css'
import { Link, useNavigate } from "react-router-dom";

const getData = async () => {
    const res = await fetch('http://localhost:3031/registrationData');
    let data = await res.json();
    return data
}

export const generateOTP = () => {
    let newOtp = Math.floor(1000 + Math.random() * 9000);
    return newOtp
};

export default function Main() {
    const navigate = useNavigate()

    const initialValue = {
        fullName: '',
        email: '',
        username: '',
        password: '',
        verified: false
    }

    const initialError = {
        fullName: '',
        email: '',
        username: '',
        password: ''
    }



    const [registrationData, setRegistrationData] = useState({ ...initialValue });
    const [error, setError] = useState({ ...initialError });
    const [showPassword, setShowPassword] = useState(false);

    const emailPattern = /^[a-z0-9]+@[a-z0-9]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    const hideShawPasswordButton = () => {
        (showPassword) ? setShowPassword(false) : setShowPassword(true)
    }

    console.log("====", registrationData);
    
    const inputValue = (e) => {
        if (e.target.name === 'fullName') {
            setRegistrationData({ ...registrationData, fullName: e.target.value.replace(/[^A-Za-z/\s/g]/ig, '') })
            if (!e.target.value) {
                setError({ ...error, fullName: 'Full name is required!' })
            } else {
                setError({ ...error, fullName: '' })
            }

        } else if (e.target.name === 'email') {
            setRegistrationData({ ...registrationData, email: e.target.value })
            if (!e.target.value) {
                setError({ ...error, email: 'Email is required!' })
            } else if (!emailPattern.test(e.target.value)) {
                setError({ ...error, email: 'Please enter valid email!' })
            } else {
                setError({ ...error, email: '' })
            }

        } else if (e.target.name === 'username') {
            setRegistrationData({ ...registrationData, username: e.target.value })
            if (!e.target.value) {
                setError({ ...error, username: 'Username is required!' })
            } else {
                setError({ ...error, username: '' })
            }

        } else if (e.target.name === 'password') {
            setRegistrationData({ ...registrationData, password: e.target.value })
            if (!e.target.value) {
                setError({ ...error, password: 'Password is required!' })
            } else if (e.target.value.length < 8) {
                setError({ ...error, password: 'Password must be 8 characters long!' })
            } else if (!passwordPattern.test(e.target.value)) {
                setError({ ...error, password: 'Please enter valid password!' })
            } else {
                setError({ ...error, password: '' })
            }
        }
    }

    const submit = async () => {
        let isFlag = false;
        const allData = await getData()

        if (!registrationData.fullName) {
            initialError.fullName = 'Full name is required!'
            setError({ ...initialError })
            isFlag = true;
        } else {
            initialError.fullName = ''
            setError({ ...initialError })
        }

        if (!registrationData.email) {
            initialError.email = 'Email is required!'
            setError({ ...initialError })
            isFlag = true;
        } else if (!emailPattern.test(registrationData.email)) {
            initialError.email = 'Please enter valid email!'
            setError({ ...initialError })
            isFlag = true;
        } else if (allData.find(x => x.email === registrationData.email)) {
            initialError.email = 'Email already existed!'
            setError({ ...initialError })
            isFlag = true;
        } else {
            initialError.email = ''
            setError({ ...initialError })
        }

        if (!registrationData.username) {
            initialError.username = 'Username is required!'
            setError({ ...initialError })
            isFlag = true;
        } else if (allData.find(x => x.username === registrationData.username)) {
            initialError.username = 'Username already existed!'
            setError({ ...initialError })
            isFlag = true;
        } else {
            initialError.username = ''
            setError({ ...initialError })
        }

        if (!registrationData.password) {
            initialError.password = 'Password is required!'
            setError({ ...initialError })
            isFlag = true;
        } else if (registrationData.password.length < 8) {
            initialError.password = 'Password must be 8 characters long!'
            setError({ ...initialError })
            isFlag = true;
        } else if (!passwordPattern.test(registrationData.password)) {
            initialError.password = 'Please enter valid password!'
            setError({ ...initialError })
            isFlag = true;
        } else {
            initialError.password = ''
            setError({ ...initialError })
        }

        if (isFlag) {
            return
        }

        await fetch('http://localhost:3031/registrationData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationData)
        })

        localStorage.setItem('OTPEmail', JSON.stringify({ email: registrationData.email, OTP: generateOTP() }));

        navigate('/otp', { state: { name: 'registration' } })
    }


    return (
        <div className="main-section">
            <div className="left-side-section">
                <img className="left-image" src={image} alt="" />
            </div>

            <div className="right-side-section">
                <div className="form-section">
                    <form>
                        <h1 className="form-title form-heading">Create New Account</h1>
                        <p className="form-title form-heading-message">Please register by filling in your personal data</p>

                        <p className="form-title input-field-heading">Full name</p>
                        <input className="input-field" value={registrationData.fullName} onChange={inputValue} name="fullName" type="text" placeholder="Enter your name" />
                        <p className="error-message">{error.fullName}</p>

                        <p className="form-title input-field-heading">Email</p>
                        <input className="input-field" value={registrationData.email} onChange={inputValue} name="email" type="text" placeholder="Enter your email" />
                        <p className="error-message">{error.email}</p>

                        <p className="form-title input-field-heading">Username</p>
                        <input className="input-field" value={registrationData.username} onChange={inputValue} name="username" type="text" placeholder="Enter your username" />
                        <p className="error-message">{error.username}</p>

                        <p className="form-title input-field-heading">Password</p>
                        <div>
                            <input className="password-input-field" value={registrationData.password} onChange={inputValue} name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" /><span className="password-hide-shaw-icon" onClick={hideShawPasswordButton}>{!showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</span>
                        </div>
                        <p className="error-message">{error.password}</p>

                        <button className="register-button" type="button" onClick={submit}>Register</button>

                        <p className="form-footer">Already have an account? <Link to='/login'><span className="redirect-button">Login</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}