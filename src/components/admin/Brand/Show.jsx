import { Link } from "react-router-dom";
import Layout from "../../common/Layout";
import SideBar from "../../common/SideBar";
import adminToken, { apiUrl } from "../../http";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function ShowBrands(){
  const [brands, setBrands] = useState([]);
  const fetchbrands = async () => {
    try {
      const response = await fetch(`${apiUrl}/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch brands.");
      }
  
      setBrands(result.brands);
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching brands.");
    }
  };
  
  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/brands/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
  
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || "Failed to delete category.");
      }
  
      toast.success("Category deleted successfully!");
      
      // تحديث القائمة بدون إعادة تحميل كل البيانات
      setBrands(brands.filter(category => category.id !== id));
  
    } catch (error) {
      toast.error(error.message || "An error occurred while deleting category.");
    }
  };
  
  useEffect(() => {
    fetchbrands();
  }, []);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-lg-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Categoris</h4>
            <Link to="/admin/brands/create" className="btn btn-primary">
              Add Category
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
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map((category) => (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                            {category.status === 0 ? (
                            <span className="badge text-bg-danger">Inactive</span>
                            ):
                            <span className="badge text-bg-success">Active</span>
                            }
                        </td>
                        <td>
                          <Link className="text-primary me-2" to={`/admin/brands/edit/${category.id}`}>
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 512 512"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
                            </svg>
                          </Link>
                          <Link className="text-danger me-2" to="#" onClick={() => deleteCategory(category.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
