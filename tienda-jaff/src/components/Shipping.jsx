import React, { useState, useEffect } from 'react';
import { processPayment } from '../services/paymentService';
import { createOrder } from '../services/orderService';

const Shipping = () => {
    const [customer, setCustomer] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        streetNumber: '',
        city: '',
        state: '',
        cp: '',
    });
    const [showPaymentInfo, setShowPaymentInfo] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        if (!isGuest) {
            const storedCustomer = localStorage.getItem('customer');
            console.log('Stored customer data:', storedCustomer);
            if (storedCustomer) {
                try {
                    const parsedCustomer = JSON.parse(storedCustomer);
                    console.log('Parsed customer data:', parsedCustomer);
                    setCustomer(parsedCustomer);
                } catch (error) {
                    console.error('Error parsing customer data from localStorage:', error);
                }
            }
        }
    }, [isGuest]);

    const handleContinue = async (e) => {
        e.preventDefault();
        try {
            const order = {
                date: new Date(),
                status: 'PENDING',
                customer: isGuest ? null : { customerId: customer.customerId },
                orderDetails: cart.map(item => ({
                    product: { productId: item.product.productId },
                    quantity: item.quantity,
                    price: item.product.price,
                })),
            };
            const createdOrder = await createOrder(order);
            setOrderId(createdOrder.orderId);
            setShowPaymentInfo(true);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!orderId) {
            console.error('Order ID is missing.');
            return;
        }
        const paymentData = {
            orderId,
            amount: cart.reduce((total, item) => total + item.quantity * item.product.price, 0), // Calculate the total amount
            paymentMethod: 'CREDIT_CARD' // O el método de pago seleccionado
        };
        try {
            const response = await processPayment(paymentData);
            console.log('Payment processed successfully:', response);
            // Clear the cart after successful payment
            setCart([]);
            localStorage.removeItem('cart');
            console.log('Cart after clearing:', cart); // Check if cart is cleared
            alert('Payment successful! Your order has been placed.');
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Error processing payment. Please try again.');
        }
    };

    useEffect(() => {
        console.log('Cart updated:', cart);
        if (cart.length === 0) {
            setShowPaymentInfo(false); // Reset to shipping info if cart is empty
        }
    }, [cart]);

    const handleGuestCheckout = () => {
        setIsGuest(true);
        setCustomer({
            name: '',
            lastName: '',
            email: '',
            phone: '',
            streetNumber: '',
            city: '',
            state: '',
            cp: '',
        });
    };

    return (
        <div className="bg-white mt-28 mx-10 lg:mx-0"> {/* Ajustar el padding top */}
            <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg w-full max-w-md"> {/* Reducir tamaño del formulario */}
                <h1 className="text-2xl font-semibold text-center mb-4">Checkout</h1>

                {!showPaymentInfo && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
                        <form onSubmit={handleContinue}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={customer.name}
                                        readOnly={!!customer.customerId && !isGuest}
                                        onChange={e => setCustomer({ ...customer, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={customer.lastName}
                                        readOnly={!!customer.customerId && !isGuest}
                                        onChange={e => setCustomer({ ...customer, lastName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={customer.email}
                                        readOnly={!!customer.customerId && !isGuest}
                                        onChange={e => setCustomer({ ...customer, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={customer.phone}
                                        readOnly={!!customer.customerId && !isGuest}
                                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={customer.streetNumber}
                                        readOnly={!!customer.customerId && !isGuest}
                                        onChange={e => setCustomer({ ...customer, streetNumber: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={customer.city}
                                        readOnly={!!customer.customerId && !isGuest}
                                        onChange={e => setCustomer({ ...customer, city: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">State</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={customer.state}
                                        readOnly={!!customer.customerId && !isGuest}
                                        onChange={e => setCustomer({ ...customer, state: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Zip Code</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={customer.cp}
                                        readOnly={!!customer.customerId && !isGuest}
                                        onChange={e => setCustomer({ ...customer, cp: e.target.value })}
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
                        <div className="text-center mt-4">
                            <button
                                onClick={handleGuestCheckout}
                                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                            >
                                Continue as Guest
                            </button>
                        </div>
                    </div>
                )}

                {showPaymentInfo && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
                        <form onSubmit={handlePayment}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2">Card Number</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Expiration Date</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">CVC</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2">Cardholder Name</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                                >
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {showPaymentInfo && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between mb-2">
                                    <span>{item.product.name}</span>
                                    <span>${item.product.price * item.quantity}</span>
                                </div>
                            ))}
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${cart.reduce((total, item) => total + item.quantity * item.product.price, 0)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shipping;
