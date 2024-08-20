import React from 'react';

const ShippingForm = ({ customer, handleInputChange, readOnly }) => (
    <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
        <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={customer.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={customer.lastName}
                        onChange={e => handleInputChange('lastName', e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={customer.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                        type="tel"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={customer.phone}
                        onChange={e => handleInputChange('phone', e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={customer.streetNumber}
                        onChange={e => handleInputChange('streetNumber', e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">City</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={customer.city}
                        onChange={e => handleInputChange('city', e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">State</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={customer.state}
                        onChange={e => handleInputChange('state', e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Zip Code</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={customer.cp}
                        onChange={e => handleInputChange('cp', e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
            </div>
        </form>
    </div>
);

export default ShippingForm;
