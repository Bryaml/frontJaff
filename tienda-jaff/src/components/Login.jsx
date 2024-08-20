import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const callbackUrl = new URLSearchParams(location.search).get('callbackUrl') || '/customer-shipping';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            console.log('Login response:', response);
            // Guardar el token y datos del cliente y redirigir
            localStorage.setItem('token', response.token);
            if (response.customer) {
                console.log('Storing customer data:', response.customer);
                localStorage.setItem('customer', JSON.stringify(response.customer));
            }
            navigate(callbackUrl);
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="bg-gray-100 pt-24 min-h-screen flex items-center justify-center">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-0 md:space-x-16">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:w-1/2">
                    <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                        >
                            Log In
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => navigate('/forget-password')}
                            className="text-indigo-500 hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>
                <div className="hidden md:block border-l border-gray-300 h-80 mx-8"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:w-1/2">
                    <h2 className="text-2xl font-semibold text-center mb-4">New Here?</h2>
                    <p className="text-gray-700 text-center mb-4">Create an account or continue as a guest to enjoy the benefits of our store.</p>
                    <div className="flex flex-col items-center space-y-4">
                        <button
                            onClick={() => navigate('/register')}
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Create Account
                        </button>
                        <div className="w-full mt-4">
                            <button
                                onClick={() => navigate('/guest-shipping')}
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                            >
                                Continue as Guest
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;


