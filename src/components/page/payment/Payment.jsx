import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './ChackOutHron';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK)
const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
        </div>
    );
};

export default Payment;