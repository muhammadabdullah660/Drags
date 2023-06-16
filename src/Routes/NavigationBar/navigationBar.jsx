import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crwnlogo } from "../../assests/crown.svg";
import "./navigationBar.scss";
export default function NavigationBar() {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Crwnlogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            SHOP
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}
