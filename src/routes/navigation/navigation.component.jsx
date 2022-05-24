import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
// Navigation is our top level component kinda like our template .. represents thing that should always be present
// Outlet is what we will swap based on route matching inside / nested route matching
const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
