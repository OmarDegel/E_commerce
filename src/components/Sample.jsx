import Layout from "./common/Layout";
import SideBar from "./common/SideBar";

export default function Sample({title,children}) {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-lg-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">{title}</h4>
          </div>
          <div className="col-md-3">
            <div className="card shadow">
              <SideBar />
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
