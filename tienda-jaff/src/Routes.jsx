import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './screens/index.jsx';
import Sales from './screens/sales.jsx';
import ProductDetail from './screens/ProductDetail.jsx';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import CartPage from './components/CartPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ForgetPassword from './components/ForgetPassword.jsx';
import InformationDetail from './components/InformationDetail.jsx';
import GuestShipping from './components/GuestShipping.jsx';
import CustomerShipping from './components/CustomerShipping.jsx';
import Favoritos from './components/Favoritos.jsx';
import LoginAdmin from './components/LoginAdmin.jsx';
import CreateProduct from './components/CreateProduct.jsx';
const AppRoutes = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        console.log('Cart updated:', cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (newItem) => {
        console.log('Adding item to cart:', newItem);
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.product.productId === newItem.product.productId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.product.productId === newItem.product.productId
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            } else {
                return [...prevCart, newItem];
            }
        });
    };

    const handleRemoveFromCart = (productId) => {
        console.log('Removing item from cart:', productId);
        setCart(prevCart => prevCart.filter(item => item.product.productId !== productId));
    };

    const handleClearCart = () => {
        console.log('Clearing cart');
        setCart([]);
    };

    const handleUpdateCartItemQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.product.productId === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    return (
        <div className="pt-16">
            <Navbar cart={cart} />
            <Routes>
                <Route path="/" element={<Index cart={cart} />} />
                <Route path="/sales" element={<Sales cart={cart} />} />
                <Route path="/product/:productId" element={<ProductDetail onAddToCart={handleAddToCart} />} />
                <Route path="/cart" element={<CartPage cart={cart} onRemoveFromCart={handleRemoveFromCart} onClearCart={handleClearCart} onUpdateCartItemQuantity={handleUpdateCartItemQuantity} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/information-detail" element={<InformationDetail />} />
                <Route path="/guest-shipping" element={<GuestShipping cart={cart} clearCart={handleClearCart} />} />
                <Route path="/customer-shipping" element={<CustomerShipping cart={cart} clearCart={handleClearCart} />} />
                <Route path="/favorites" element={<Favoritos />} />
                <Route path="/login-admin" element={<LoginAdmin />} />
                <Route path="/create-product" element={<CreateProduct />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
