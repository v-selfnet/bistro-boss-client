import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";


const Login = () => {
    const [disable, setDisable] = useState(true);
    const { signIn } = useContext(AuthContext);

    //private route
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleSignin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // signin
        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                // private route
                navigate(from, {replace:true})
            })
            .catch(error => console.error(error))
    }

    // captcha
    const captchaRef = useRef()
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleCaptcha = () => {
        const userCaptchaValue = captchaRef.current.value;
        console.log(userCaptchaValue)

        if (validateCaptcha(userCaptchaValue)) {
            setDisable(false)
        }
        else {
            alert('Captcha not Correct')
        }
    }

    return (
        <>
            <Helmet><title>Bistro Boss | Login</title></Helmet>

            <div className="hero">
                <div className="hero-content flex-col lg:flex-row gap-40 mt-10">
                    <div className="text-center lg:text-left w-1/2 space-y-10">
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h1 className="text-4xl font-bold text-center my-6">Login</h1>
                            <form onSubmit={handleSignin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>


                                {/* Captcha */}
                                <div className="form-control border m-4 p-4">
                                    <label className="label">
                                        <LoadCanvasTemplate></LoadCanvasTemplate>
                                    </label>
                                    <input onBlur={handleCaptcha} type="text" ref={captchaRef} name="captcha" placeholder="captcha" className="input input-bordered" disabled/>
                                </div>
                                {/* Captcha */}


                                <div className="form-control mt-6">
                                    {/* TODO:  disabled={disable} for captcha active*/} 
                                    <input type="submit" disabled={false} value="Login" className="btn btn-primary" />
                                </div>
                            </form>
                            <SocialLogin></SocialLogin>
                            <p className='text-xs mt-3'>Do not have an Account? <Link to='/register' className='text-orange-600'>Please Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;