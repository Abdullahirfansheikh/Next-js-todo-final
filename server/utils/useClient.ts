// useClient.ts

import axios, { AxiosInstance } from 'axios';

const useClient = (): AxiosInstance => {
    const instance = axios.create({
        // Configure your axios instance here, such as setting base URL, default headers, etc.
        baseURL: 'http://your-api-base-url.com',
        timeout: 5000, // Adjust timeout as needed
    });

    // You can add interceptors or other configurations if needed

    return instance;
};

export default useClient;
