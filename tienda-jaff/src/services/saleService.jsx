import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/products',
    headers: {
        'Content-Type': 'application/json',
    },
});




export const getProductsByCategoryAndSubcategory = async (category, subcategory) => {
    try {
        const response = await apiClient.get(`/category/${category}/subcategory/${subcategory}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
