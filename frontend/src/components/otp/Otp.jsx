import React, { useState } from 'react'
import "./Otp.css"
import { useNavigate } from "react-router-dom"
const Otp = ({ otp, id, username, email }) => {
    const navigate = useNavigate();
    const [optv, setOptv] = useState("")
    const handleClick = () => {
        if (otp === optv) {
            localStorage.setItem("id", id);
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            navigate("/");
        }
    }
    return (
        <div className='otp'>
            <div className="otp_main">
                <div className="otp_text">Enter the OTP sent to your Email</div>
                <div className="otp_inp">
                    <input type="text" className="otp_input"
                        value={optv}
                        onChange={(e) => setOptv(e.target.value)}
                    />
                </div>
                <div className="otp_button" onClick={handleClick}>Submit</div>
            </div>
        </div>
    )
}

export default Otp