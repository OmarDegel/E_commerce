import { Link } from "react-router-dom";
import Layout from "./common/Layout";
import ProductImg from "../assets/images/Mens/eight.jpg";
import { useState } from "react";

export default function Checkout() {
  const [payment, setPayment] = useState();
  function handlePayment(e) {
    setPayment(e.target.value);
  }
  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/Checkout">Checkout</Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <h3 className="border-bottom pb-3">billing details</h3>
            <form action="">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="name"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-3">
                    <textarea
                      type="text"
                      placeholder="address"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="city"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="state"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="number"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="zip"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-5">
            <h3 className="border-bottom pb-3">items</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td width={100}>
                    <img src={ProductImg} alt="" width={80} />
                  </td>
                  <td width={600}>
                    <h4>dasdasdasd</h4>
                    <div className="d-flex align-item-center pt-3">
                      <span>100</span>
                      <div className="ps-5">
                        <button className="btn btn-size">L</button>
                      </div>
                      <div className="ps-5">X 1</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between border-bottom py-2">
                  <div>sub</div>
                  <div>100</div>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <div>shipping</div>
                  <div>100</div>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <div>Grand Total</div>
                  <div>100</div>
                </div>
              </div>
            </div>
            <h3 className="border-bottom pb-3 pt-3">
              <strong>Payment Method</strong>
            </h3>
            <div>
              <input
                type="radio"
                onClick={handlePayment}
                checked={payment == "stripe"}
                value={"stripe"}
              />
              <label htmlFor="" className="form-control ps-2">
                stripe
              </label>
              <input
                type="radio"
                onClick={handlePayment}
                checked={payment == "cod"}
                value={"cod"}
              />
              <label htmlFor="" className="form-control ps-2">
                cod
              </label>
            </div>
            <div className="d-felx justify-content-end py-3">
              <button className="btn btn-primary">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
