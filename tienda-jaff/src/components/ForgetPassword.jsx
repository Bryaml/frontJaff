import React, { useState } from 'react';
import { forgetPassword } from '../services/authService';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {
            await forgetPassword(email);
            setMessage('Password recovery instructions have been sent to your email.');
            setError('');
        } catch (error) {
            setError('Error during password recovery');
            setMessage('');
        }
    };

    return (
        <div className="bg-gray-100 pt-24 min-h-screen flex items-center justify-center">
            <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleForgetPassword}>
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
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                    >
                        Send Instructions
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
