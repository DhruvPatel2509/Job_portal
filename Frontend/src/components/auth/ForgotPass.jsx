import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "../../redux/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(
    JSON.parse(localStorage.getItem("isOtpSent")) || false
  );
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(
    parseInt(localStorage.getItem("timer")) || 30
  );
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    let countdown;
    if (isOtpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          const newTimer = prev - 1;
          localStorage.setItem("timer", newTimer); // Save the updated timer
          return newTimer;
        });
      }, 1000);
    }

    if (timer <= 0) {
      localStorage.removeItem("timer");
    }

    return () => clearInterval(countdown);
  }, [timer, isOtpSent]);

  useEffect(() => {
    localStorage.setItem("isOtpSent", isOtpSent);
  }, [isOtpSent]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/forgotPass`, {
        email,
      });
      if (res.status === 200) {
        localStorage.setItem("passToken", res?.data?.data);
        toast.success(res.data.message);
        setIsOtpSent(true);
        setTimer(120);
        localStorage.setItem("timer", 120);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      setTimer(60);
      localStorage.setItem("timer", 60);
    }
  };

  const handleBack = () => {
    setIsOtpSent(false);
    setEmail("");
    localStorage.removeItem("isOtpSent");
    localStorage.removeItem("timer");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    const sotp = otp.join("");

    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/verifyOtp`, { sotp });
      if (res.status === 200) {
        localStorage.removeItem("isOtpSent");
        localStorage.removeItem("timer");
        navigate("/forgotPass/NewPassword");
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
            placeholder="Enter your email"
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
