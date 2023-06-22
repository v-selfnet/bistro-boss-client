import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

    const handleDelete = item => {
        // use swal2 for alert message
        console.log(item)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // main code ---------------------------------------------------
                axiosSecure.delete(`/menu/${item._id}`).then(res => {
                    console.log('deleted res:', res.data)
                    if (res.data.deletedCount > 0) {
                        refetch();
                        // main code ---------------------------------------
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
            }
        })

    }

    return (
        <div className="w-full">
            <Helmet><title>Bistro Boss | Add Item</title></Helmet>
            <SectionTitle
                subHeading={`~ Total Items: ${menu.length} ~`}
                heading={'Manage Items'}
            ></SectionTitle>

            <div className="overflow-x-auto mx-10">
                <table className="table w-full">
                    {/* head */}
                    <thead className="text-base text-red-900">
                        <tr>
                            <th className="bg-green-300">#</th>
                            <th className="bg-green-300">Image</th>
                            <th className="bg-green-300">Name</th>
                            <th className="bg-green-300">Price</th>
                            <th className="bg-green-300">Update</th>
                            <th className="bg-green-300">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) => <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">Update</button>
                                </td>
                                <td>
                                    {/* <button className="btn btn-ghost btn-xs">Delete</button> */}

                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost text-red-600 text-3xl"><FaTrash /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageItems;