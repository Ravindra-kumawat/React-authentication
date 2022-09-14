import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

function Dashboard() {
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const getNotes = async () => {
        const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        setUsers(json.data);
        setTotalPage(json.total_pages);
        console.log(json.total_pages);
    }

    const deleteUser = async (id) => {
        const response = await fetch(`https://reqres.in/api/users/${id}`, {
            method: 'DELETE'
        });
        const json = await response.json();
        console.log(json)
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        } else {
            navigate("/signin", { replace: true });
        }
        // eslint-disable-next-line
    }, [page])
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
                        <Link to="/dashboard" className="nav-link align-middle py-2 px-2 text-black fw-bold">
                            <i className="fas fa-users"></i> <span className="ms-1 d-none d-sm-inline">Users</span>
                        </Link>
                    </div>
                    <div className="col p-5">
                        <h2 > Users</h2>
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Avtar</th>
                                    <th>Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th colSpan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => {
                                        return (
                                            <tr>
                                                <td>  <img src={user.avatar} height="50" alt="..." /> </td>
                                                <td>{user.id}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{user.email}</td>
                                                <td><button className="btn btn-sm btn-info">Edit</button></td>
                                                <td> <button className="btn btn-sm btn-danger" onClick={() => { deleteUser(user.id) }}>Delete</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="container d-flex justify-content-between my-5">
                            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="btn btn-sm btn-dark">&larr; Previous</button>
                            <button disabled={page >= totalPage} onClick={() => setPage(page + 1)} className="btn btn-sm btn-dark">Next &rarr;</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard