import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type':'application/json'
    }
});

// Separate Axios instance for refreshing the token.
// This is important because we don't want the refresh
// request itself to go through our 401 interceptor.
const refreshClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem('access_token');
        if (accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error)=>{
        const originalRequest = error.config;
        if (
            error.response?.status == 401 &&
            !originalRequest._retry
        ){
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');

            if(!refreshToken){
                logoutUser();
                return Promise.reject(error);
            }

            try{
                const response = await refreshClient.post(
                    '/auth/refresh/',
                    {
                        refresh: refreshToken
                    }
                );
                const newAccessToken = response.data.access;

                localStorage.setItem('access_token',newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            }catch(error){
                logoutUser();

                return Promise.reject(
                    error
                );
            }
        }
        return Promise.reject(error);
    }
);

function logoutUser() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
}

export default api;