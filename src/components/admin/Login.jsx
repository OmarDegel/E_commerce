import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import { apiUrl } from "../http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const {login}=useContext(AdminAuthContext);
  const onSubmit = async (data) => {
    try {

      const response = await fetch(`${apiUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
        return;
      }

      if (response.ok) {
        toast.success("Login successful! 🎉");
        console.log(result.token);
        const adminInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };
        localStorage.setItem("admin", JSON.stringify(adminInfo));
        login(adminInfo);
        navigate("/admin/dashboard");
      } else {
        toast.error(result.error || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while connecting to the server.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0" style={{ width: "400px" }}>
            <div className="card-body p-4">
              <div className="mb-3">
                <h3>Login</h3>
                <label htmlFor="" className="form-label">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "The email field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="email"
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="password"
                />
              </div>
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
              <button className="btn btn-secondary">login</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
