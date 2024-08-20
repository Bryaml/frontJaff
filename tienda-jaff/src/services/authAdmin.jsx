import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authAdmin = async (email, password) => {
    try {
        const response = await apiClient.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error during login request:', error.response || error.message);
        throw new Error(error.response?.data || 'An error occurred while logging in.');
    }
};
