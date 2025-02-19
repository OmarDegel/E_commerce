import { Link, useParams } from "react-router-dom";
import Layout from "./common/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductImg from "../assets/images/Mens/eight.jpg";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiUrl } from "./http";
import { CartContext } from "./context/Cart";
export default function Product() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const {addToCart} = useContext(CartContext);
  const param = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/get-product/${param.id}`, {
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
        console.log(result.data);
        setProductImages(result.data.product_images);
        setProduct(result.data);
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching categories"
        );
      }
    };
    fetchProduct();
  }, [param.id]);
  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart!");
  }
  return (
    <Layout>
      <div className="container product-detail">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/shop">product</Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              <div className="col-2">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  direction={`vertical`}
                  spaceBetween={10}
                  slidesPerView={6}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >
                  {productImages &&
                    productImages.map((product) => (
                      <SwiperSlide key={product.id}>
                        <div className="content">
                          <img
                            src={product.image_url}
                            alt=""
                            height={100}
                            className="w-100"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <div className="col-10">
                {productImages &&
                  productImages.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="content">
                        <img src={product.image_url} alt="" className="w-100" />
                      </div>
                    </SwiperSlide>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h2>{product.title}</h2>
            <div>
              <Rating initialValue={rating} size={20} readonly />
              <span className="pt-1 ps-2">10 review</span>
            </div>
            <div className="price h3 py-3">${product.price}</div>
            <div>{product.short_description}</div>
            <div className="add-to-cart my-3">
              <button className="btn btn-primary" onClick={handleAddToCart}>Add To Cart</button>
            </div>
            <hr />
            <div>
              <strong>Sku</strong>
              {product.sku}
            </div>
          </div>
        </div>
        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Description">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </Tab>
              <Tab eventKey="profile" title="Reviews">
                Tab content for Profile
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
