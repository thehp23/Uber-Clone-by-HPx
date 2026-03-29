 import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="max-w-3xl w-full bg-white p-6 rounded-xl shadow-lg">
        
        <h1 className="text-3xl font-bold mb-4 text-center">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          This Privacy Policy explains how we collect, use, and protect your
          information when you use our ride-sharing platform.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">1. Information We Collect</h2>
        <p className="text-sm text-gray-600 mb-3">
          We may collect personal details such as your name, email, phone number,
          location data, and payment information when you use our services.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">2. How We Use Information</h2>
        <p className="text-sm text-gray-600 mb-3">
          Your information is used to provide and improve our services, process
          transactions, communicate updates, and ensure user safety.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">3. Sharing of Information</h2>
        <p className="text-sm text-gray-600 mb-3">
          We do not sell your personal data. However, we may share information
          with drivers, service providers, or authorities when required by law.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">4. Data Security</h2>
        <p className="text-sm text-gray-600 mb-3">
          We implement reasonable security measures to protect your data, but no
          system is completely secure.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">5. Location Data</h2>
        <p className="text-sm text-gray-600 mb-3">
          We collect real-time location data to match riders with drivers and
          provide accurate ride tracking.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">6. Your Rights</h2>
        <p className="text-sm text-gray-600 mb-3">
          You may update or delete your account information at any time by
          contacting support.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">7. Changes to Policy</h2>
        <p className="text-sm text-gray-600 mb-3">
          We may update this Privacy Policy from time to time. Continued use of
          the platform means you accept the updated policy.
        </p>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Last updated: 2026
        </p>

      </div>
    </div>
  );
};

export default PrivacyPolicy;