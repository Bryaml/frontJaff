import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';

const ProductDetail = ({ onAddToCart }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productId);
                setProduct(response);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size.');
            return;
        }

        const cartItem = {
            product: {
                productId: product.productId,
                name: product.name,
                description: product.description,
                price: product.price,
                images: product.images,
                size: selectedSize
            },
            quantity
        };

        onAddToCart(cartItem);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    {product.images && product.images.length > 0 && (
                        <img
                            src={`http://localhost:8080${product.images[0].imagePath}`}
                            alt={product.name}
                            className="w-full h-auto object-cover"
                        />
                    )}
                </div>
                <div className="md:w-1/2 md:pl-8">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-lg mb-4">{product.description}</p>
                    <p className="text-xl font-semibold mb-6">${product.price}</p>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Select Size</h2>
                        <div className="flex flex-wrap">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    className={`border rounded-md px-4 py-2 mr-2 mb-2 hover:bg-gray-100 ${selectedSize === size ? 'border-black' : 'border-gray-300'}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="text-lg font-semibold mb-2">Quantity</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="border rounded-md px-4 py-2 mr-2 mb-2"
                        />
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
