import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../axios';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {id,token}=useParams()
    //params is a parameter that passing to the routes jo humne url main pass kiya hai id and token that is param

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/resetpassword/${id}/${token}`, { password });
            
            // On success, handle the response
            if (response.status === 200) {
                alert("Password reset successfully");
                navigate("/login");
                setPassword(""); 
            }
        } catch (err) {
console.log(err)
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
            <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white" style={{ width: "90%", maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Reset Password</h2>
                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        value={password} 
                        required 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Update</button>
            </form>
        </div>
    );
};

export default ResetPassword;
