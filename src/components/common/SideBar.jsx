import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuth";
import { Link } from "react-router-dom";

export default function SideBar() {
    const { logout } = useContext(AdminAuthContext);

    return(
        <div className="card-body p-4 sidebar">
                <ul>
                    <li>
                        <Link to="">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/categories">Category</Link>
                    </li>
                    <li>
                        <Link to="/admin/brands">Brands</Link>
                    </li>
                    <li>
                        <Link to="/admin/products">Products</Link>
                    </li>
                    <li>
                        <Link to="">Orders</Link>
                    </li>
                    <li>
                        <Link to="">Users</Link>
                    </li>
                    <li>
                        <Link to="">Shipping</Link>
                    </li>
                    <li>
                        <Link to="">ChangePassword</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={logout}>LogOut</Link>
                    </li>
                </ul>
              </div>
    )
}