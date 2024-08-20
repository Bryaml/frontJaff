import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAdmin } from '../services/authAdmin';

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authAdmin(email, password);
            const { token, customer } = response;

            if (customer.role !== 'admin') {
                setError('Access denied: Not an admin.');
                return;
            }

            localStorage.setItem('token', token);
            localStorage.setItem('customer', JSON.stringify(customer));
            navigate('/create-product');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-gray-100 pt-24 min-h-screen flex items-center justify-center">
            <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginAdmin;
