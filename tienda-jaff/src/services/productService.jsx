// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

export const getProductById = async (productId) => {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
};

