import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null {
  const navigateTo = useNavigate();

  useEffect(() => {
    // Retrieve Token from Cookies
    const token = Cookies.get("token");
    // Navigate to Login Page if no token in cookies
    if (!token) {
      navigateTo("/login");
    }
  }, [navigateTo]);

  const token = Cookies.get("token");

  return token ? <>{children}</> : null;
}
