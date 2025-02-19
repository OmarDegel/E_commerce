import Layout from "./common/Layout";
import product from "../assets/images/Mens/eight.jpg";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiUrl } from "./http";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [seachParams, setSearchParams] = useSearchParams([]);
  const featuredBrands = async () => {
    try {
      const response = await fetch(`${apiUrl}/get-brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch categories.");
      }

      setBrands(result.data);
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching categories."
      );
    }
  };
  const featuredCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/get-categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch categories.");
      }

      setCategories(result.data);
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching categories."
      );
    }
  };
  const featuredProducts = async () => {
    let search=[];
    let params="";
    if(selectedCategory.length>0){
      search.push(['category_id',selectedCategory]);
    }
    if(selectedBrand.length>0){
      search.push(['brand_id',selectedBrand]);
    }
    if(search.length>0){
      params=new URLSearchParams(search);
      setSearchParams(params);
    }else{
      setSearchParams([]);
    }
    try {
      const response = await fetch(`${apiUrl}/get-products?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch categories.");
      }

      setProducts(result.data);
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching categories."
      );
    }
  };
  const handleCategory = (e) => {
    const { checked, value } = e.target; 
  
    if (checked) {
      setSelectedCategory([...selectedCategory, value]);
    } else {
      setSelectedCategory(selectedCategory.filter((c) => c !== value));
    }
  };
  const handleBrand = (e) => {
    const { checked, value } = e.target; 
  
    if (checked) {
      setSelectedBrand([...selectedBrand, value]);
    } else {
      setSelectedBrand(selectedBrand.filter((c) => c !== value));
    }
  };
  
  useEffect(() => {
    featuredProducts();
    featuredCategories();
    featuredBrands();
  }, [selectedCategory,selectedBrand]);
  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className="py-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3>categories</h3>
                <ul>
                  {categories &&
                    categories.map((category) => (
                      <li className="mb-2" key={category.id}>
                        <input type="checkbox" value={category.id} onChange={handleCategory}/>
                        <label htmlFor="" className="ps-2">
                          {category.name}
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3>Brands</h3>
                <ul>
                  {brands &&
                    brands.map((brand) => (
                      <li className="mb-2" key={brand.id}>
                        <input type="checkbox" value={brand.id} onChange={handleBrand}/>
                        <label htmlFor="" className="ps-2">
                          {brand.name}
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              {products &&
                products.map((product) => (
                  <div className="col-md-4 col-6" key={product.id}>
                    <div className="product card border-0">
                      <div className="card-img">
                        <Link to={`../product/${product.id}`}>
                          <img
                            src={product.image_url}
                            alt=""
                            className="w-100"
                          />
                        </Link>
                      </div>
                      <div className="card-body pt-3">
                        <Link to={`../product/${product.id}`}>{product.title}</Link>
                        <div className="price">
                          ${product.price}
                          <span className="text-decoration-line-through">
                            ${product.compare_at_price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              ;
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
