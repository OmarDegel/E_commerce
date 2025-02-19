import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="py-5 text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <img src={logo} alt="" width={150} />
            <div className="pt-3 pe-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos saepe numquam recusandae repellat voluptatem quam unde
            </div>
          </div>
          <div className="col-md-3">
            <h2 className="mb-3">category</h2>
            <ul>
              <li>
                <a href="">Men</a>
              </li>
              <li>
                <a href="">Women</a>
              </li>
              <li>
                <a href="">Kid</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h2>quik link</h2>
            <ul>
              <li>
                <a href="">login</a>
              </li>
              <li>
                <a href="">register</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h2>my contact</h2>
            <ul>
              <li>
                <a href="">465464546162</a>
              </li>
              <li>
                <a href="">544511.2134164</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
