import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

function Navbar() {

    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/signin", { replace: true });
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <div className="container">
                    <Link className="navbar-brand" to="/">Auth Test Project (React App)</Link>
                    <button className="btn btn-primary  btn-sm" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar