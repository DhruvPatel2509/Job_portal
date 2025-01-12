import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../utils/axiosUtility";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (isOtpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer, isOtpSent]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/forgotPass`, {
        email,
      });
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("passToken", res?.data?.data);
        toast.success(res.data.message);
        setIsOtpSent(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input box if current is filled
    if (element.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      setTimer(30); // Reset timer
      console.log("Resending OTP...");
    }
  };

  const handleBack = () => {
    setIsOtpSent(false);
    setEmail("");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    const sotp = otp.join("");

    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/verifyOtp`, { sotp });
      console.log(res);
      if (res.status === 200) {
        navigate("/forgotPass/NewPassword");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {!isOtpSent ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          <p className="text-gray-600 mb-6">
            Enter your email address to receive a 6-digit code.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full max-w-md p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3">
            <button
              onClick={handleEmailSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send OTP
            </button>

            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          <p className="text-gray-600 mb-6">
            Enter the 6-digit code sent to your email.
          </p>

          <div className="flex gap-2 mb-6">
            {otp.map((_, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index] && index > 0) {
                    document.getElementById(`otp-input-${index - 1}`).focus();
                  }
                }}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <div className="mb-6">
            {timer > 0 ? (
              <p className="text-gray-600">Resend OTP in {timer} seconds</p>
            ) : (
              <button
                onClick={handleResendOtp}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Resend OTP
              </button>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
