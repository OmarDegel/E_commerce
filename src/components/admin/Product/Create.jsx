import {  Link, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import SideBar from "../../common/SideBar";
import { useForm } from "react-hook-form";
import adminToken, { apiUrl } from "../../http";
import { toast } from "react-toastify";
import { useEffect, useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

export default function CreateProduct({ placeholder }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [gallery, setGallery] = useState([]);
  const editor = useRef(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );
  const handleEditorChange = (newContent) => {
    setValue("description", newContent);
  };

  const uploadTempImage = async (imageFile) => {
    if (!imageFile) {
      toast.error("Please select an image file.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", imageFile.name);

    try {
      const response = await fetch(`${apiUrl}/temp-images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken()}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to upload image.");
      }
      gallery.push(result.id);
      setGallery(gallery);

      return result.image_url;
    } catch (error) {
      toast.error(error.message || "Error uploading image.");
      return null;
    }
  };

  const onSubmit = async (data) => {
    if (data.image && data.image[0]) {
      await uploadTempImage(data.image[0]);
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    });
    formData.append("image", data.image[0]);
    gallery.forEach((imageId, index) => {
      formData.append(`gallery[${index}]`, imageId);
    });

    try {
      const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken()}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong!");
      }

      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${apiUrl}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch categories.");
      }

      setCategories(result.categories);
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching categories."
      );
    }
  };
  const fetchBrands = async () => {
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
  useEffect(() => {
    fetchCategory();
    fetchBrands();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-lg-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Categoris</h4>
            <Link to="/admin/products" className="btn btn-primary">
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
                    <label htmlFor="name">Product Title</label>
                    <input
                      {...register("title", {
                        required: "Product title is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      id="title"
                      name="title"
                    />
                    {errors.title && (
                      <p className="text-danger">{errors.title.message}</p>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="">Category</label>
                        <select
                          className={`form-control ${
                            errors.category_id ? "is-invalid" : ""
                          }`}
                          {...register("category_id", {
                            required: "Product category is required",
                          })}
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {errors.category_id && (
                          <p className="text-danger">
                            {errors.category_id.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="">Brand</label>
                        <select
                          className="form-control"
                          {...register("brand_id", {})}
                        >
                          <option value="">Select Brand</option>
                          {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {brand.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      short description
                    </label>
                    <textarea
                      className={`form-control`}
                      {...register("short_description")}
                      id=""
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <JoditEditor
                      ref={editor}
                      value={watch("content") || ""}
                      config={config}
                      onBlur={handleEditorChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="">Price</label>
                        <input
                          type="number"
                          {...register("price", {
                            required: "Product price is required",
                          })}
                          className={`form-control ${
                            errors.price ? "is-invalid" : ""
                          }`}
                        />
                        {errors.price && (
                          <p className="text-danger">{errors.price.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="">Discount price</label>
                        <input
                          type="number"
                          className="form-control"
                          {...register("compare_price")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="">Sku</label>
                        <input
                          type="text"
                          {...register("sku", {
                            required: "Product sku is required",
                          })}
                          className={`form-control ${
                            errors.sku ? "is-invalid" : ""
                          }`}
                        />
                        {errors.sku && (
                          <p className="text-danger">{errors.sku.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="">barcode</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("barcode")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="">featured</label>
                      <select
                        {...register("is_featured", {
                          required: "Product featured is required",
                        })}
                        className={`form-control ${
                          errors.featured ? "is-invalid" : ""
                        }`}
                        id="status"
                        name="status"
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                      {errors.featured && (
                        <p className="text-danger">{errors.featured.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="">qty</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("qty")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                          {...register("status", {
                            required: "Product status is required",
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
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      {...register("image")}
                    />
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
