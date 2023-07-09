import React, { useState } from 'react'
import loginimage from '../assets/images/animation_community_management_fix.webp'
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import QRCodeGenerator from '../QRcode/Qrcode';


function Login() {
    const [login, setLogin] = useState(true)
    const [qrcard, setQrCard] = useState(false)
    const [logindata, setLogindata] = useState({ username: '', password: '' });
    const [registerdata, setRegisterdata] = useState({ username: '', email: '', password: '' });
    const qrcodetext = "you have successfully registered as an employee" + "your email: " + registerdata.email + " " + "your username: " + registerdata.username;
    const handleLogin = () => {
        setLogin(!login)
    };

    const navigate = useNavigate();
    // LOGIN 
    const handleChangeLogin = (e) => {
        setLogindata({ ...logindata, [e.target.name]: e.target.value });
    };
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/login/', logindata)
            .then((response) => {
                // setError(false)
                console.log("response", response.data);
                localStorage.setItem("token", response.data.token.access)
                if (response.data.is_manager == true) {
                    navigate('/home-m')
                } else {
                    navigate('/home')
                }

                // setLogindata({ ...logindata, email: '', password: '' })
            })
            .catch((error) => {
                // setError(error.response.data.non_field_errors[0])
                // setLogindata({ ...logindata, password: '' })
                console.log("error", error);
            });
    };
    // Register
    const handleChangeRegister = (e) => {
        setRegisterdata({ ...registerdata, [e.target.name]: e.target.value });
    };
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/register/', registerdata)
            .then((response) => {
                // setError(false)
                console.log("response", response);
                setQrCard(true)
                // setLogindata({ ...logindata, email: '', password: '' })
                // navigate('/home')
            })
            .catch((error) => {
                // setError(error.response.data.non_field_errors[0])
                // setLogindata({ ...logindata, password: '' })
                console.log("error", error);
            });
    };
    const handleQrclick = () => {
        setLogin(true);
        setQrCard(false);
    };


    return (
        <div>
            <div className="login-page container-fluid p-3">
                <div className="login-container d-flex">

                    {login ?
                        <div className="login-left d-flex flex-column justify-content-center align-items-center w-50">
                            <div className="login-title">Login</div>
                            <div className="login-form-box d-flex flex-column align-items-center w-50">
                                <label htmlFor='username' className='d-flex flex-column align-items-start p-2'>Username
                                    <input
                                        className='form-control'
                                        id='username'
                                        type="username"
                                        name='username'
                                        value={logindata.username}
                                        onChange={handleChangeLogin}
                                    />
                                </label>
                                <label htmlFor='password' className='d-flex flex-column align-items-start p-2'>Password
                                    <input
                                        className='form-control'
                                        id='password'
                                        type="password"
                                        name='password'
                                        value={logindata.password}
                                        onChange={handleChangeLogin}
                                    />
                                </label>
                                <div className='submit-btn' onClick={handleSubmitLogin}>Login</div>
                            </div>
                            <div className="register-link">Not a User? <a onClick={handleLogin}>Register</a></div>
                        </div>
                        :
                        <div className="login-left d-flex flex-column justify-content-center align-items-center w-50">
                            <div className="login-title">Register</div>
                            <div className="login-form-box d-flex flex-column align-items-center w-50">
                                <label htmlFor='username' className='d-flex flex-column align-items-start p-2'>Username
                                    <input
                                        className='form-control'
                                        id='username'
                                        type="username"
                                        name='username'
                                        value={registerdata.username}
                                        onChange={handleChangeRegister}
                                    />
                                </label>
                                <label htmlFor='password' className='d-flex flex-column align-items-start p-2'>Email
                                    <input
                                        className='form-control'
                                        id='email'
                                        type="email"
                                        name='email'
                                        value={registerdata.email}
                                        onChange={handleChangeRegister}
                                    />
                                </label>
                                <label htmlFor='password' className='d-flex flex-column align-items-start p-2'>Password
                                    <input
                                        className='form-control'
                                        id='password'
                                        type="password"
                                        name='password'
                                        value={registerdata.password}
                                        onChange={handleChangeRegister}
                                    />
                                </label>
                                <div className='submit-btn' onClick={handleSubmitRegister}>Register</div>
                            </div>
                            <div className="register-link">Existing User? <a onClick={handleLogin}>Login</a></div>
                        </div>
                    }
                    {qrcard ? <div className='qr-card'>
                        <QRCodeGenerator
                            text={qrcodetext}
                            size="200" />
                        <div className='qr-text'>You have Successfully registered<br></br> as an Employee </div>
                        <div onClick={handleQrclick} className="qr-btn2">Continue to Login</div>
                    </div> : ""}
                    <div className="login-right w-50">
                        <img src={loginimage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login