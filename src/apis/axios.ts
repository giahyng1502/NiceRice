import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import crashlytics from "@react-native-firebase/crashlytics";
import {logCriticalError} from "../utils/errorHandler";
// src/config/apiConfig.ts
// export const API_BASE_URL = 'https://api.devpull.top';
export const API_BASE_URL = 'http://10.0.2.2:3000';

const axiosClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor — thêm token vào header nếu có
axiosClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        logCriticalError('axiosClient response interceptor', error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            console.error('❌ API Error:', error.response.data);
        } else if (error.request) {
            console.error('❌ No response received:', error.request);
        } else {
            console.error('❌ Error setting up request:', error.message);
        }
        logCriticalError('axiosClient response interceptor', error);
        return Promise.reject(error.response?.data || error);
    }
);


export default axiosClient;
