import { Link } from "react-router-dom";
import Layout from "./common/Layout";
import { CartContext } from "./context/Cart";
import { useContext } from "react";

export default function Cart() {
  const { cart, subTotal, grandToral,shipping } = useContext(CartContext);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/shop">Cart</Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="col-md-12">
          <h2 className="border-bottom py-3"> cart</h2>
          <table className="table">
            <tbody>
              {cart &&
                cart.map((item) => (
                  <tr key={item.id}>
                    <td width={100}>
                      <img src={item.image_url} alt="" width={80} />
                    </td>
                    <td>
                      <h4>{item.title}</h4>
                      <div className="d-flex align-item-center">
                        <span>{item.price}</span>
                      </div>
                    </td>
                    <td valign="middle">
                      <input
                        type="number"
                        style={{ width: "100px" }}
                        value={item.quantity}
                        className="form-control"
                        onChange={(e) => {
                          const newQuantity = e.target.value;
                          return newQuantity;
                        }}
                      />
                    </td>
                    <td valign="middle">
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="row justify-content-end">
          <div className="col-md-3">
            <div className="d-flex justify-content-between border-bottom py-2">
              <div>sub</div>
              <div>{subTotal()}</div>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <div>shipping</div>
              <div>{shipping()}</div>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <div>Grand Total</div>
              <div>{grandToral()}</div>
            </div>
            <button className="btn btn-primary">Buy</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
