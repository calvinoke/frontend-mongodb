import React from "react";

const Help = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Help & Support</h1>
        <p className="text-lg mb-4 text-center">
          Welcome to the Help & Support page. Here, you can find answers to common questions and contact support for assistance.
        </p>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>How do I reset my password?</li>
              <li>How can I update my profile information?</li>
              <li>Who can I contact for technical issues?</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Contact Support</h2>
            <p>Email: <a href="mailto:support@example.com" className="text-blue-500 underline">support@example.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="text-blue-500 underline">+1 234 567 890</a></p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;
