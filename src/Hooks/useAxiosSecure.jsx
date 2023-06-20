import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Provider/AuthProvider';
import useAuth from './useAuth';

const useAxiosSecure = () => {
    // const { logOut } = useContext(AuthContext)
    const {logOut} = useAuth();
    const navigate = useNavigate();

    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000',
    });

    useEffect(() => {
        axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(res => res, async error => {
                if (error.res && (error.response.status === 401 || error.res.status === 403)) {
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            });
    }, 
    [logOut, navigate, axiosSecure]);
    return [axiosSecure];
};

export default useAxiosSecure;