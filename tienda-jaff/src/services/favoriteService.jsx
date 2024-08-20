import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const addFavorite = async (productId) => {
    const customer = JSON.parse(localStorage.getItem('customer'));
    if (!customer) {
        alert('You need to be logged in to add products to favorites.');
        return;
    }
    const response = await apiClient.post('/favorites/add', null, {
        params: {
            email: customer.email,  // Asegúrate de que el email se envía aquí
            productId: productId,
        }
    });
    return response.data;
};

export const removeFavorite = async (productId) => {
    const customer = JSON.parse(localStorage.getItem('customer'));
    if (!customer) {
        alert('You need to be logged in to remove products from favorites.');
        return;
    }
    const response = await apiClient.post('/favorites/remove', null, {
        params: {
            email: customer.email,  // Asegúrate de que el email se envía aquí
            productId: productId,
        }
    });
    return response.data;
};

export const getFavorites = async () => {
    const customer = JSON.parse(localStorage.getItem('customer'));
    if (!customer) {
        alert('You need to be logged in to view your favorites.');
        return [];
    }
    const response = await apiClient.get('/favorites', {
        params: {
            email: customer.email,  // Asegúrate de que el email se envía aquí
        }
    });
    return response.data;
};
