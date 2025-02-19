import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', credentials);
            localStorage.setItem('token', response.data.access_token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
            <input type="password" onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            <button type="submit">Login</button>
        </form>
    );
};