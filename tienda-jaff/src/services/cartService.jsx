import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/cart",
    headers: {
        "Content-Type": "application/json",
    },
});

// For guest user
const userRole = 'guest';

// For registered user
// const userRole = 'registered';

export const createNewCart = async () => {
    try {
        const response = await apiClient.post("/new", {}, {
            headers: {
                "User-Role": userRole
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating new cart:", error);
        throw error;
    }
};

// Similarly, add the "User-Role" header for other requests
