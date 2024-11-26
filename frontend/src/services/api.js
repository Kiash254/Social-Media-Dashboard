// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const getAccounts = () => axios.get(`${API_URL}accounts/`);
export const getPosts = () => axios.get(`${API_URL}posts/`);
export const createPost = (post) => axios.post(`${API_URL}posts/`, post);