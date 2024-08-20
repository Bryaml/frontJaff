import React, { useState, useEffect } from 'react';
import { getFavorites } from '../services/favoriteService';

const Favoritos = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavorites();
                console.log('Fetched favorites:', data);
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="bg-white mt-28 mx-10 lg:mx-0 min-h-screen pt-16 pb-16">
            <h1 className="text-2xl font-semibold text-center mb-4">Favoritos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map(product => (
                    <div key={product.productId} className="bg-gray-100 p-4 rounded-lg shadow-lg">
                        {product.images && product.images.length > 0 ? (
                            <img src={`http://localhost:8080${product.images[0].imagePath}`} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                                <span className="text-gray-500">No Image Available</span>
                            </div>
                        )}
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <p className="text-gray-900 font-bold">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favoritos;
