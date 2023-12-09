import React, { useState } from 'react'
import "./Login.css"
import { Link, } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = async () => {
        try {
            const res = await fetch("https://anchors-discussion-forum-backend.vercel.app/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email, password
                })
            })
            const data = await res.json()
            if (data.error) {
                setError(data.error)
            }
            else {
                localStorage.setItem("username", data.username)
                localStorage.setItem("id", data._id)
                localStorage.setItem("email", data.email)

                navigate("/")
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="login">

            <div className="main">
                <div className="login_form_left">
                    <div className="signin">
                        <div className="signin_main">Sign in</div>
                        <div className="login_form_main">
                            <div className="username">
                                <div className="username_text">Email</div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your Email"
                                    className="inp"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="password">
                                <div className="password_text">Password</div>
                                <input
                                    type="password"
                                    placeholder="Enter your Password"
                                    id="password"
                                    className="inp"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="error">{error}</div>
                            <button onClick={submitHandler} className="login_button btn">
                                <div className="login_text btn">Login</div>
                            </button>
                        </div>
                        <div className="register">
                            Don’t have an Account ?{" "}
                            <Link to={"/signup"} className="register_text">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
                <img
                    src="/images/logo_image.png"
                    alt="Login image"
                    className="login_image2"
                />
            </div>
        </div>
    )
}

export default Login