import React, { useState } from 'react';
import { createProduct } from '../services/createProductService';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('subcategory', subcategory);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await createProduct(formData, token);
            setMessage('Product created successfully!');
        } catch (error) {
            setMessage('Error creating product. Please try again.');
        }
    };

    return (
        <div className="bg-gray-100 pt-24 min-h-screen flex items-center justify-center">
            <div className="bg-white mt-28 mx-10 lg:mx-0">
                <h2 className="text-2xl font-semibold text-center mb-4">Create Product</h2>
                {message && <p className="text-center mb-4 text-green-500">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Stock</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Category</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Subcategory</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Images</label>
                        <input
                            type="file"
                            multiple
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
