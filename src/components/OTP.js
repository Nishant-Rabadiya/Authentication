import React from "react";
import image from '../Assests/image.jpg'
import '../Assests/main.css'
import OTPbody from "../subComponents/OTPbody";

export default function OTP() {
    const items = JSON.parse(localStorage.getItem('OTPEmail'));
    return (
        <div className="main-section">
            <div className="left-side-section">
                <img className="left-image" src={image} alt="" />
            </div>

            <div className="right-side-section">
                <div className="form-section">
                    <OTPbody email={items?.email} />
                    {/* <form action="">
                        <button className="arrow-button"><i className="fa-solid fa-arrow-left"></i></button>

                        <div className="otp-heding-section">
                            <h2 className="otp-heading">OTP Varification</h2>
                            <p className="otp-message">Enter the 4-digit code sent to your device</p>
                        </div>

                        <div className="otp-section">
                            <input className="otp-input-field" type="text" />
                            <input className="otp-input-field" type="text" />
                            <input className="otp-input-field" type="text" />
                            <input className="otp-input-field" type="text" />
                        </div>
                        <p className="error-message">Error</p>

                        <button className="register-button">Verify OTP</button>
                        <div className="resend-text">
                            Didn't receive the code?
                            <span className="resend-link">Resend Code</span> <span id="timer">(0: 00)</span>
                        </div>
                    </form> */}
                </div>
            </div>
        </div>
    )
}