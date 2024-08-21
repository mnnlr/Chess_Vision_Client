import axios from 'axios';

const defaultAxios = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },

});

export { defaultAxios };