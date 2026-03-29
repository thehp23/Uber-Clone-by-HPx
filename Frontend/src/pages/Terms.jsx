import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="max-w-3xl w-full bg-white p-6 rounded-xl shadow-lg">
        
        <h1 className="text-3xl font-bold mb-4 text-center">
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          Welcome to our ride-sharing platform. By accessing or using our
          services, you agree to be bound by the following terms and conditions.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">1. User Accounts</h2>
        <p className="text-sm text-gray-600 mb-3">
          You must provide accurate and complete information during registration.
          You are responsible for maintaining the confidentiality of your account
          and password.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">2. Use of Service</h2>
        <p className="text-sm text-gray-600 mb-3">
          You agree to use the service only for lawful purposes. Misuse, fraud,
          or any illegal activities are strictly prohibited.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">3. Payments</h2>
        <p className="text-sm text-gray-600 mb-3">
          All payments must be completed through the platform. Prices may vary
          depending on distance, demand, and time.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">4. Cancellations</h2>
        <p className="text-sm text-gray-600 mb-3">
          Users may cancel rides, but cancellation fees may apply depending on
          timing and circumstances.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">5. Safety</h2>
        <p className="text-sm text-gray-600 mb-3">
          We strive to ensure safety, but users are responsible for their own
          actions. Always verify driver and vehicle details before starting a ride.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">6. Termination</h2>
        <p className="text-sm text-gray-600 mb-3">
          We reserve the right to suspend or terminate accounts that violate our
          terms without prior notice.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">7. Changes to Terms</h2>
        <p className="text-sm text-gray-600 mb-3">
          We may update these terms at any time. Continued use of the service
          implies acceptance of the updated terms.
        </p>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Last updated: 2026
        </p>

      </div>
    </div>
  );
};

export default Terms;