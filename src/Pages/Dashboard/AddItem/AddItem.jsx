import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useMenu from '../../../Hooks/useMenu';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from 'sweetalert2'

// from imgbb.com
const imgHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_KEY;

const AddItem = () => {
    const [menu] = useMenu();
    const [axiosSecure] = useAxiosSecure();
    console.log(menu.length)

    const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${imgHostingToken}`

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data)
        // upload image
        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(imgHostingUrl, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgRes => {
                console.log(imgRes)
                if (imgRes.success) {
                    const imgUrl = imgRes.data.display_url;
                    console.log(imgUrl)
                    const { name, category, price, recipe } = data;
                    const newItem = { name, category, price: parseFloat(price), recipe, image: imgUrl }
                    // console.log(data.name)
                    console.log(newItem)
                    axiosSecure.post('/menu', newItem)
                    .then(data => {
                        console.log('Add Item Menu:', data.data)
                        if(data.data.insertedId){
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'New Item Added successfully ',
                                showConfirmButton: false,
                                timer: 1500
                              })
                        }
                    })
                }
            })


    };
    console.log(errors);


    return (
        <div className="w-full">
            <Helmet><title>Bistro Boss | Add Item</title></Helmet>
            <SectionTitle
                subHeading={"~ What is new ~ "}
                heading={`Total Items: ${menu.length}`}
            ></SectionTitle>

            <div className="mx-auto p-10 w-3/4 rounded-lg bg-blue-200">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name</span>
                        </label>
                        <input type="text" placeholder="recipe name"
                            className="input input-bordered w-full"
                            {...register("name", { required: true })} />
                    </div>

                    <div className="flex justify-between">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select defaultValue="Select Category" className="select select-bordered w-full max-w-xs"
                                {...register("category", { required: true })}>
                                <option disabled>Select Category</option>
                                <option>Salad</option>
                                <option>Pizza</option>
                                <option>Dessert</option>
                                <option>Soup</option>
                                <option>Drinks</option>
                            </select>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" placeholder="price" className="input input-bordered w-full max-w-xs"
                                {...register("price", { required: true })} />
                        </div>
                    </div>


                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Detail</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" placeholder="recipe detail"
                            {...register("recipe", { required: true })} />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Upload Image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full"
                            {...register("image", { required: true })} />
                    </div>

                    <input type="submit" value="Add Item" className="btn btn-success w-full mt-6" />

                </form>
            </div>

        </div>
    );
};

export default AddItem;