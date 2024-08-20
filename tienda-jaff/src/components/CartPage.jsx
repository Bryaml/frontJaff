import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, onRemoveFromCart, onClearCart, onUpdateCartItemQuantity }) => {
    const navigate = useNavigate();
    console.log('Cart content:', cart);

    if (!cart || cart.length === 0) {
        return <div className="container mx-auto my-28 p-4 bg-white shadow-md rounded">Your cart is empty.</div>;
    }

    const handleIncrement = (productId) => {
        const item = cart.find(item => item.product.productId === productId);
        onUpdateCartItemQuantity(productId, item.quantity + 1);
    };

    const handleDecrement = (productId) => {
        const item = cart.find(item => item.product.productId === productId);
        if (item.quantity > 1) {
            onUpdateCartItemQuantity(productId, item.quantity - 1);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const shippingCost = 10; // Valor fijo para el costo de envío
    const total = calculateTotal() + shippingCost;

    const handleCheckout = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/customer-shipping');
        } else {
            navigate('/login?callbackUrl=/customer-shipping');
        }
    };

    return (
        <div className="bg-white mt-28 mx-10 lg:mx-0">
            <div className="container mx-auto py-16 px-4 md:px-0 flex flex-col md:flex-row">
                <div className="w-full md:w-2/3">
                    <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
                    <ul>
                        {cart.map(item => (
                            <li key={item.product.productId} className="flex items-center border-b border-gray-200 py-4">
                                <img
                                    src={`http://localhost:8080${item.product.images[0].imagePath}`}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover mr-2"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold">{item.product.name}</h2>
                                    <p className="text-gray-600">{item.product.description}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleDecrement(item.product.productId)}
                                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrement(item.product.productId)}
                                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="mt-2 font-bold text-gray-800">${item.product.price}</p>
                                </div>
                                <button
                                    onClick={() => onRemoveFromCart(item.product.productId)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="text-right mt-8">
                        <button
                            onClick={onClearCart}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/3 md:pl-8 mt-8 md:mt-0">
                    <div className="p-4 border rounded-md shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Envio</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Total of products</span>
                            <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Shipping Cost</span>
                            <span className="font-semibold">${shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
