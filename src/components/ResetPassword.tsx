import { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isMatch, setIsMatch] = useState(true);

  const validatePassword = (value: string) => {
    setPassword(value);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValid(passwordRegex.test(value));
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    setIsMatch(value === password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Reset Password</h2>
        <p className="text-gray-600 text-sm mb-4">
          Your new password must follow the rules below.
        </p>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />
          <ul className="text-xs text-gray-500 mt-2">
            <li className={password.length >= 8 ? "text-green-600" : "text-red-500"}>
              ✅ At least 8 characters
            </li>
            <li className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-500"}>
              ✅ One uppercase letter (A-Z)
            </li>
            <li className={/[a-z]/.test(password) ? "text-green-600" : "text-red-500"}>
              ✅ One lowercase letter (a-z)
            </li>
            <li className={/\d/.test(password) ? "text-green-600" : "text-red-500"}>
              ✅ One number (0-9)
            </li>
            <li className={/[@$!%*?&]/.test(password) ? "text-green-600" : "text-red-500"}>
              ✅ One special character (@, #, $, etc.)
            </li>
          </ul>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => validateConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
          />
          {!isMatch && confirmPassword.length > 0 && (
            <p className="text-red-500 text-xs mt-1">Passwords do not match!</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={!isValid || !isMatch}
          className={`w-full py-2 mt-4 rounded text-white font-bold ${
            isValid && isMatch ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
