import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import ShippingForm from '../screens/ShippingForm';
import { createOrder } from '../services/orderService';
import { processPayment } from '../services/paymentService';

const stripePromise = loadStripe('pk_test_51PnEr3RuoHZojnGz4Bt7jgG45WVstSaCCZtxo2hMAtdXAPDiZAB5xoxz67wX1fdfRCC5WStub5odJZnAKEAlmtH400bNN7meHd');

const CheckoutForm = ({ cart, clearCart, orderId }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (e) => {
        e.preventDefault();
        
        if (!stripe || !elements) {
            return;
        }
    
        const cardElement = elements.getElement(CardElement);
    
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
    
        if (error) {
            console.error(error);
            alert('Error creating payment method. Please try again.');
            return;
        }
    
        const paymentData = {
            orderId,
            amount: cart.reduce((total, item) => total + item.quantity * item.product.price, 0) * 100, // Convertir a centavos
            paymentMethod: paymentMethod.id // Usar el ID del método de pago creado
        };
    
        try {
            const response = await processPayment(paymentData);
            console.log('Payment processed successfully:', response);
            clearCart();
            alert('Payment successful! Your order has been placed.');
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Error processing payment. Please try again.');
        }
    };
    

    return (
        <form onSubmit={handlePayment}>
            <CardElement />
            <div className="text-center mt-4">
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                    Place Order
                </button>
            </div>
        </form>
    );
};

const CustomerShipping = ({ cart, clearCart }) => {
    const [customer, setCustomer] = useState({});
    const [showPaymentInfo, setShowPaymentInfo] = useState(false);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
            try {
                const parsedCustomer = JSON.parse(storedCustomer);
                setCustomer(parsedCustomer);
            } catch (error) {
                console.error('Error parsing customer data from localStorage:', error);
            }
        }
    }, []);

    const handleContinue = async (e) => {
        e.preventDefault();
        try {
            const order = {
                date: new Date(),
                status: 'PENDING',
                customer: { customerId: customer.customerId },
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

    return (
        <Elements stripe={stripePromise}>
            <div className="bg-white mt-28 mx-10 lg:mx-0">
                <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-semibold text-center mb-4">Checkout</h1>

                    {!showPaymentInfo && (
                        <div>
                            <ShippingForm
                                customer={customer}
                                handleInputChange={() => {}}
                                readOnly={true}
                            />
                            <div className="text-center">
                                <button
                                    onClick={handleContinue}
                                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {showPaymentInfo && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
                            <CheckoutForm
                                cart={cart}
                                clearCart={clearCart}
                                orderId={orderId}
                            />
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
        </Elements>
    );
};

export default CustomerShipping;
