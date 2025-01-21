import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "../../redux/authSlice";
import Cookies from "js-cookie";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(
    () => Cookies.get("isOtpSent") === "true" || false
  );
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(() => parseInt(Cookies.get("timer")) || 0);
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const otpRefs = useRef([]);

  useEffect(() => {
    let countdown;
    if (isOtpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          const updatedTimer = prev - 1;
          if (updatedTimer >= 0) {
            Cookies.set("timer", updatedTimer, { expires: 1 / 24 / 60 }); // Expires in a few minutes
          } else {
            Cookies.remove("timer");
          }
          return updatedTimer;
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [timer, isOtpSent]);

  useEffect(() => {
    Cookies.set("isOtpSent", isOtpSent, { expires: 1 / 24 / 60 }); // Expires in a few minutes
  }, [isOtpSent]);

  const otpSend = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/forgotPass`, {
        email,
      });
      console.log(res);

      if (res.status === 200) {
        Cookies.set("passToken", res?.data?.data, { expires: 1 / 24 }); // Expires in 1 hour
        toast.success(res.data.message);
        setIsOtpSent(true);
        setTimer(30);
        Cookies.set("timer", 30, { expires: 1 / 24 / 60 }); // Expires in a few minutes
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await otpSend();
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      otpSend();
      setTimer(60);
      Cookies.set("timer", 60, { expires: 1 / 24 / 60 }); // Expires in a few minutes
    }
  };

  const handleBack = () => {
    setIsOtpSent(false);
    setEmail("");
    Cookies.remove("isOtpSent");
    Cookies.remove("timer");
    navigate("/login");
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const sotp = otp.join("");
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/verifyOtp`, { sotp });
      if (res.status === 200) {
        toast.success("OTP Verified!");
        Cookies.remove("isOtpSent");
        Cookies.remove("timer");
        navigate("/forgotPass/NewPassword");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
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
            placeholder="Enter your registered email"
            className="w-full max-w-md p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-3">
            <button
              onClick={handleEmailSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                "Send OTP"
              )}
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
                ref={(el) => (otpRefs.current[index] = el)}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index] && index > 0) {
                    otpRefs.current[index - 1]?.focus();
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
              onClick={verifyOtp}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
