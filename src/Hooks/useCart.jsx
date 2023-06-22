// use tanstack query
// npm i @tanstack/react-query

import { useQuery } from '@tanstack/react-query'
// import { useContext } from 'react';
// import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
    // const { user } = useContext(AuthContext);
    const { user, loading } = useAuth();
    // const token = localStorage.getItem('acess-token')
    const [axiosSecure] = useAxiosSecure()

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        // queryFn: async () => {
        //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, { 
        //         // middleware-jwt: send header to server to check the token
        //         headers: {
        //             authorization: `bearer ${token}`
        //         }})
        //     return res.json()
        // },
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            // console.log('res from axios', res)
            return res.data;
        },

    })
    return [cart, refetch]

}
export default useCart; 