import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createOrder = async (order) => {
    try {
        const response = await apiClient.post('/orders/create', order);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error.response || error.message);
        throw new Error(error.response?.data || 'An error occurred while creating the order.');
    }
};
