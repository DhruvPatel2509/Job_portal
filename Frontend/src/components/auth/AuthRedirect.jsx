import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthRedirect({ redirectTo, component }) {
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate(redirectTo); // Redirect if user is already logged in
    }
  }, [authUser, navigate, redirectTo]);

  return <>{!authUser ? component : null}</>; // Render the component if user is not logged in
}

export default AuthRedirect;
