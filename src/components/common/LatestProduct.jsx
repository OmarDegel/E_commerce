import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiUrl } from "../http";

export default function LatestProduct() {
  const [products, setProducts] = useState([]);
  const featuredProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/get-latest-products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = await response.json();
      console.log(result.data);
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
  useEffect(() => {
    featuredProducts();
  }, []);
  return (
    <section className="section-2 py-5">
      <div className="container ">
        <h2 className="mb-4">New</h2>
        <div className="row mt-4 ">
          {products && products.map((product) => (
            <div className="col-md-3 col-6" key={product.id}>
            <div className="product card border-0">
              <div className="card-img">
                <img src={product.image_url} alt="" className="w-100" />
              </div>
              <div className="card-body pt-3">
                <Link href="">{product.title}</Link>
                <div className="price">
                  {product.price}
                  <span className="text-decoration-line-through">${product.compare_price}</span>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
