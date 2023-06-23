import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [cart, refetch] = useCart();
    // console.log(cart)
    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);

    const handleDelete = item => {
        console.log(item)
        Swal.fire({
            title: 'Are you sure to delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            refetch() // call function fron hook useCart.jsx
                            Swal.fire(
                                'Deleted!',
                                'Your item has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div className="w-full mx-10">
            <Helmet><title>Bistro Boss | My Cart</title></Helmet>
            <SectionTitle
                subHeading={"~ My Cart~ "}
                heading={"Want to add more Item"}
            ></SectionTitle>
            <div className="flex justify-evenly my-4">
                <h3 className="text-2xl font-semibold">Total Orders: {cart.length}</h3>
                <h3 className="text-2xl font-semibold">Total Price: $ {totalPrice.toFixed(2)}</h3>
                <Link to='/dashboard/payment'>
                    <button className="btn btn-active btn-sm text-orange-700 bg-orange-300 border-0">Pay Now</button>
                </Link>
            </div>

            {/* table */}
            <div>
                <table className="table w-3/4 mx-auto">
                    {/* head */}
                    <thead >
                        <tr >
                            <th className="bg-orange-400">#</th>
                            <th className="bg-orange-400">Image</th>
                            <th className="bg-orange-400">Name</th>
                            <th className="bg-orange-400">Price</th>
                            <th className="bg-orange-400">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((row, index) => <tr
                                key={row.addToCart}
                            >
                                <td>{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={row.image} alt="Image Loading..." />
                                        </div>
                                    </div>
                                </td>
                                <td>{row.name}</td>
                                <td>{row.price}</td>
                                <td>
                                    <button onClick={() => handleDelete(row)} className="btn btn-ghost text-red-600 text-3xl"><FaTrash /></button>
                                </td>
                            </tr>) // end map
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyCart;