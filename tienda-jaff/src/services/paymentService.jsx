import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const processPayment = async (paymentData) => {
    try {
        const response = await apiClient.post('/payments/process', paymentData);
        return response.data;
    } catch (error) {
        console.error('Error during payment processing:', error.response?.data || error.message);
        throw new Error(error.response?.data || 'An error occurred while processing the payment.');
    }
};
