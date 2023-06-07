import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../Hooks/useCart";

const FoodCard = ({ item }) => {
    const { _id, name, image, price, recipe } = item;
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();

    const handleAddToCart = addItem => {
        console.log(addItem)
        if (user && user.email) {
            // server: 3 [cartItems] this object insert in MongoDB. create new collection name [carts]
            // const cartCollection = client.db('bistroDB').collection('carts')
            const cartItems = { addToCart: _id, name, image, price, email: user.email }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItems)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        refetch(); // when add a item call refetch() to view order qty in navbar 
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Successfully added to Cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please Login',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl relative">
            <figure><img className="rounded-lg" src={image} alt="Food" /></figure>
            <div className="card-body">
                <p className="absolute top-0 right-0 indicator-item badge badge-primary">${price}</p>
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-accent btn-block">Ad to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;