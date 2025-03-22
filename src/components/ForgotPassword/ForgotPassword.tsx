import { useState } from "react";
import { motion } from "framer-motion";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!verified) {
      alert("Please verify you are not a robot!");
      return;
    }
    setEmailSent(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-bold text-blue-600 text-center mb-4">
          Forgot Password?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email to receive a reset link.
        </p>

        {emailSent ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold">✅ Password reset link sent!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={(e) => setVerified(e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-600">I'm not a robot</span>
            </label>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
