import { useContext, useEffect } from "react";
import { AdminAuthContext } from "../context/AdminAuth";
import { useNavigate } from "react-router-dom";

export default function AdminRequireAuth({ children }) {
  const { user } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  return children;
}
