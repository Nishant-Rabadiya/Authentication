import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState()
    const loginData = JSON.parse(localStorage.getItem('loginData'));

    const logoutButton = () => {
        localStorage.setItem('loginData', JSON.stringify({ email: '' }));
        navigate('/login')
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3031/registrationData');
            const jsonData = await response.json();
            setData(jsonData);
        };
        fetchData();
    }, []);

    const currData = data?.find(x => x?.email === loginData?.email)

    return (
        <>
            <div className="navbar-section">
                <div className="userFirstName">
                    <p className="userName">{currData?.fullName.charAt(0).toUpperCase()}</p>
                </div>
                <button className="logoutButton" type="button" onClick={logoutButton}>Logout</button>
            </div>
            <div className="form-section" style={{ textAlign: "center", backgroundColor: '#f4f4f7' }}>
                <h1><u>{'Welcome ' + currData?.fullName}</u></h1>
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>User name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{currData?.fullName}</td>
                            <td>{currData?.username}</td>
                            <td>{currData?.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>

    )
}