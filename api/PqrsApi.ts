import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_DB_URL;

export const PqrsApi = axios.create({
    baseURL: API_URL,
    });