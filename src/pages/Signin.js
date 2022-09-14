import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import welcomeImg from '../assets/images/welcome.jpg'
import userImg from '../assets/images/user.png'
import { Link } from "react-router-dom";

function Signin() {
    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard", { replace: true });
        } else {
            navigate("/signin", { replace: true });
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://reqres.in/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loginCredentials.email, password: loginCredentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.token) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.token);
            alert("Login Successfully.");
            navigate("/dashboard", { replace: true });

        }
        else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container-fluid bgcolor">
                <div className="container position-center">
                    <div className="row">
                        <div className="offset-2 col-md-4 bg-white d-flex border-end">
                            <img src={welcomeImg} style={{ width: '100%', objectFit: 'contain' }} alt="..." />
                        </div>
                        <div className="col-md-4 bg-white p-3 py-4">
                            <div className='d-flex flex-column align-items-center'>
                                <img src={userImg} alt="" width={100} />
                                <h4>Login Form</h4>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name='email' id='email' className="form-control" onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name='password' id='password' className="form-control" onChange={onChange} required />
                                </div>
                                <div className="d-flex flex-row justify-content-between">
                                    <button type="submit" className="btn btn-primary mr-3">SignIn</button>
                                    <div className="d-flex flex-row align-items-center">
                                        <span> Don't have an account?.</span><br />
                                        <Link to="/signup" className="btn btn-primary ms-2">SignUp</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin