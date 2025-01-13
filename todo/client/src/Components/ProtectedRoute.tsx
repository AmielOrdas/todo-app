import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode | null {
  const navigateTo = useNavigate();

  useEffect(() => {
    // Retrieve Token from Cookies
    const token = Cookies.get("token");
    // Navigate to Login Page if no token in cookies
    if (!token) {
      navigateTo("/NotFound");
    }
  }, [navigateTo]);

  const token = Cookies.get("token");
  // If there is no token then return null. Otherwise, return the page
  return token ? children : null;
}
