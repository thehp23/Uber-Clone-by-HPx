import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

// 💳 PAYMENT FORM
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();

  const { rideId, amount } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      setLoading(true);
      setError("");

      // 1️⃣ Create Payment Intent
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payment/create-intent`,
        {
          amount: Math.round(amount),
        }
      );

      // 2️⃣ Confirm Payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      // 3️⃣ SUCCESS
      if (result.paymentIntent.status === "succeeded") {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/rides/mark-paid`,
          {
            rideId: rideId,
            paymentId: result.paymentIntent.id,
          }
        );

        // ✅ Redirect to Ride page
        navigate("/ride");
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Payment failed. Try again.");
      setLoading(false);
    }
  };

  return (
  <div className="bg-white min-h-[calc(100vh-64px)] flex justify-center items-start pt-6">

    {/* 🔥 PAYMENT CARD */}
    <div className="w-[320px] bg-white px-5 py-6 shadow-xl rounded-lg border border-gray-300">

      <h2 className="text-xl font-bold mb-4 text-center">
        Complete Payment
      </h2>

      {/* 💰 AMOUNT */}
      <div className="bg-yellow-400 rounded px-4 py-3 flex justify-between items-center mb-4">
        <div>
          <p className="text-sm font-semibold">Total Fare</p>
          <p className="text-xl font-bold">
            ₹{Math.round(amount || 0)}
          </p>
        </div>
        <div className="text-xl font-bold">₹</div>
      </div>

      {/* 💳 FORM */}
      <form onSubmit={handlePayment} className="space-y-3">

        <div className="bg-gray-100 border rounded px-3 py-3">
          <CardElement
            options={{
              style: {
                base: {
                  color: "#000",
                  fontSize: "14px",
                  "::placeholder": {
                    color: "#6B7280",
                  },
                },
                invalid: {
                  color: "#EF4444",
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="text-red-500 text-xs text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-2.5 rounded font-semibold transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }
          `}
        >
          {loading
            ? "Processing..."
            : `Pay ₹${Math.round(amount || 0)}`}
        </button>
      </form>

      {/* DIVIDER */}
      <div className="flex items-center gap-2 my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-400 text-xs">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* UPI */}
      <div className="space-y-2">

        <p className="text-xs text-gray-500 text-center">
          Pay via UPI Apps
        </p>

        <div className="grid grid-cols-3 gap-2">

          <div className="bg-gray-100 border rounded p-2 text-center text-xs hover:bg-gray-200 cursor-pointer">
            GPay
          </div>

          <div className="bg-gray-100 border rounded p-2 text-center text-xs hover:bg-gray-200 cursor-pointer">
            PhonePe
          </div>

          <div className="bg-gray-100 border rounded p-2 text-center text-xs hover:bg-gray-200 cursor-pointer">
            Paytm
          </div>

        </div>

        {/* QR */}
        <div className="mt-2 border rounded-lg p-3 text-center bg-gray-50">

          <div className="w-24 h-24 mx-auto bg-gray-200 flex items-center justify-center rounded mb-2">
            <span className="text-gray-500 text-xs">QR</span>
          </div>

          <p className="text-xs text-gray-400">
            Scan & pay
          </p>

        </div>
      </div>

      {/* FOOTER */}
      <p className="text-xs text-gray-400 text-center mt-4">
        🔒 Secured by Stripe
      </p>

    </div>
  </div>
);
};

// WRAPPER
const UserPayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default UserPayment;