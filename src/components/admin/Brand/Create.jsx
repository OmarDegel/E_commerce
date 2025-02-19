import { Link, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import SideBar from "../../common/SideBar";
import { useForm } from "react-hook-form";
import adminToken, { apiUrl } from "../../http";
import { toast } from "react-toastify";

export default function CreateBrand() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/brands`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || "Something went wrong!");
      }
      toast.success("brand added successfully!");
      navigate("/admin/brands");
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };
  

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-lg-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Categoris</h4>
            <Link to="/admin/brands" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <div className="card shadow">
              <SideBar />
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="name">brand Name</label>
                    <input
                      {...register("name", {
                        required: "brand name is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      name="name"
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      {...register("status", {
                        required: "brand status is required",
                      })}
                      className={`form-control ${
                        errors.status ? "is-invalid" : ""
                      }`}
                      id="status"
                      name="status"
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                    {errors.status && (
                      <p className="text-danger">{errors.status.message}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
