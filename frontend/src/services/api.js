// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const getAccounts = () => axios.get(`${API_URL}accounts/`);
export const getAccount = (id) => axios.get(`${API_URL}accounts/${id}/`);
export const createAccount = (account) => axios.post(`${API_URL}accounts/`, account);
export const updateAccount = (id, account) => axios.put(`${API_URL}accounts/${id}/`, account);
export const deleteAccount = (id) => axios.delete(`${API_URL}accounts/${id}/`);

export const getPosts = () => axios.get(`${API_URL}posts/`);
export const getPost = (id) => axios.get(`${API_URL}posts/${id}/`);
export const createPost = (post) => axios.post(`${API_URL}posts/`, post);
export const updatePost = (id, post) => axios.put(`${API_URL}posts/${id}/`, post);
export const deletePost = (id) => axios.delete(`${API_URL}posts/${id}/`);