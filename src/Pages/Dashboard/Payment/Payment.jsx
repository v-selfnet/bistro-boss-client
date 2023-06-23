import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../Hooks/useCart";


// TODO: provide key
const stripePromise = loadStripe(import.meta.env.VITE_PAYENT_KEY);

const Payment = () => {
    // console.log('Stripe API Key', stripePromise)
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));

    return (
        <div className="w-full mx-auto">
            <Helmet><title>Bistro Boss | Payment Gateway</title></Helmet>
            <SectionTitle
                subHeading={"~ My Cart~ "}
                heading={"Payment Processing..."}
            ></SectionTitle>

            <div className="bg-blue-200 px-10 py-2 rounded-2xl w-1/2 mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm cart={cart} price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;