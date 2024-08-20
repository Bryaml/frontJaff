import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
    const [customer, setCustomer] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        streetNumber: '',
        cp: '',
        state: '',
        city: '',
        village: ''
    });
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value
        }));
    };

    const handleContinue = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(customer);
            navigate('/login');
        } catch (error) {
            setError('Registration failed.');
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="bg-gray-100 pt-24 min-h-screen flex items-center justify-center">
            <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {step === 1 && (
                    <form onSubmit={handleContinue}>
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={customer.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={customer.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={customer.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={customer.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={customer.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Street Number</label>
                                <input
                                    type="text"
                                    name="streetNumber"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={customer.streetNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Postal Code</label>
                                <input
                                    type="text"
                                    name="cp"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={customer.cp}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={customer.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={customer.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Village</label>
                                <input
                                    type="text"
                                    name="village"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={customer.village}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Register;
