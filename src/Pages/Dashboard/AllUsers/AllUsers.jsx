// using tanstack query

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import logo from '/profile.png'
import { FaTrash, FaUserShield } from "react-icons/fa";

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        // console.log(users)
        const res = await fetch('http://localhost:5000/users')
        return res.json();
    })

    
    const handleMakeAdmin = user => {
        console.log(user)
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            refetch();
            console.log(data)
        })
    }

    const handleDelete = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data.deletedCount > 0){
                refetch();
                alert('User Delete Seccess !!!')
            }

        })
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>
            <h3 className="text-2xl font-semibold">All Users: {users.length}</h3>

            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Roll</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index +1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user?.photo ? user.photo : logo} alt="Photo" />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.pass}</td>
                                <td>{user.role === 'admin' ? 'admin' : 
                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost text-orange-600 text-3xl"><FaUserShield /></button>
                                }
                                </td>
                                <td>
                                <button onClick={() => handleDelete(user)} className="btn btn-ghost text-red-600 text-3xl"><FaTrash /></button>
                                </td>
                            </tr>)

                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;