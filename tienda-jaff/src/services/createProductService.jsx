import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const createProduct = async (productData, token) => {
    try {
        const response = await apiClient.post('/products', productData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error during product creation:', error.response || error.message);
        throw new Error(error.response?.data || 'An error occurred while creating the product.');
    }
};
