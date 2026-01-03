import axios from "axios";

// 1️⃣ Create Axios instance
const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

// 2️⃣ Request interceptor to attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access-token'); // read token from storage
        if (token) {
            // Attach token to Authorization header
            config.headers.Authorization = `Bearer ${token}`; // Capital A recommended
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3️⃣ Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response ? error.response.status : null;

        // If token is invalid or expired
        if (status === 401 || status === 403) {
            console.error("Security error. Logging out...");

            // Remove invalid token
            localStorage.removeItem('access-token');

            // Optional: redirect to login page
            // window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;
