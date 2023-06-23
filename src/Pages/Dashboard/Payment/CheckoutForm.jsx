import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import './CheckoutForm.css'

const CheckoutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardErr, setCardErr] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const { user } = useAuth();
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res);
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure]);

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) { return }

        const card = elements.getElement(CardElement);
        if (card === null) { return }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) { setCardErr(error.message); }
        else { setCardErr(''); }

        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'unknown'
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError)
        }

        console.log('payment intent:', paymentIntent)
        setProcessing(false);
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // payment info save to server/DB
            const payment = {
                transId: paymentIntent.id,
                data: new Date(),
                price,
                name: user?.name,
                email: user?.email,
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.addToCart),
                itemNames: cart.map(item => item.name),
                status: 'service pending'
            }
            axiosSecure.post('/payment', payment)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    alert('payment info sent to server success')
                }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#428770',
                            '::placeholder': {
                                color: '#aab9c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret || processing} className="btn btn-warning btn-xs w-full">Pay</button>
            {cardErr && <p className="text-red-600 pt-4">{cardErr}</p>}
            {transactionId && <p className="text-green-600 pt-4 text-xs">Transaction Complete: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;