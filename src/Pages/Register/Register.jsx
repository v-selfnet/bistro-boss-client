import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Register = () => {

    // form created by reacy-hook-form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext)

    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const newUser = result.user;
                console.log('New User Create Successfully ', newUser);

                // update user profile
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        // server: 7 store user info to DB [id, pass]
                        const saveUser = {name: data.name, email: data.email, pass: data.password}
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type':'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        }) // fetch close )
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Succefully updated user profile',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => console.error(error));
    };

    return (
        <>
            <Helmet><title>Bistro Boss | Register</title></Helmet>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row gap-40 mt-10">
                    <div className="text-center lg:text-left w-1/2 space-y-10">
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h1 className="text-4xl font-bold text-center my-6">Register</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" {...register("name")} name="name" placeholder="name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email")} name="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*])/
                                    })} placeholder="password" className="input input-bordered" />

                                    {/* password error handel */}
                                    {
                                        errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>
                                    }
                                    {
                                        errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be six characters</p>
                                    }
                                    {
                                        errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than twenty characters</p>
                                    }
                                    {
                                        errors.password?.type === 'pattern' && <p className='text-red-600'>Password must be [one upper], [one lower], [one digit] & [one special] characters</p>
                                    }
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo</span>
                                    </label>
                                    <input type="text" {...register("photo", {
                                        required: true
                                    })} name="photo" placeholder="Photo link imgBB" className="input input-bordered" />
                                    {/* Photo error handel */}
                                    {
                                        errors.photo?.type === 'required' && <p className='text-red-600'>Password is required</p>
                                    }
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" value="Register" className="btn btn-primary" />
                                </div>
                            </form>
                            <SocialLogin></SocialLogin>
                            <p className='text-xs mt-3'>Do not have an Account? <Link to='/login' className='text-orange-600'>Please Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;