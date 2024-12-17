import axios from 'axios';

const ApiServer = axios.create({
    baseURL: import.meta.env.VITE_API_SERVER_URL, 
    headers: {
        'Content-Type': 'application/json', 
    },
});
export default ApiServer;

// import.meta.env.VITE_API_SERVER_URL