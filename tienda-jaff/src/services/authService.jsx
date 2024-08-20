import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error during login request:', error.response || error.message);
        throw new Error(error.response?.data?.message || 'An error occurred while logging in.');
    }
};
export const register = async (customer) => {
    try {
        const response = await apiClient.post('/customers/register', customer); // Ajuste aquí
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};
export const forgetPassword = async (email) => {
    try {
        await apiClient.post('/customers/forgetPassword', { email });
    } catch (error) {
        console.error('Error during password recovery:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerData');
};
