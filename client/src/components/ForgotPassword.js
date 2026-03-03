import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/forgotpassword", { email });
            if (response.status === 200) {
                alert("Email sent successfully");
                setEmail(""); 
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100"
            style={{ background: "linear-gradient(135deg, #f6d8f6, #d0e8ff)" }}>
            <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white" style={{ width: "90%", maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Forgot Password</h2>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        value={email} 
                        required 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
