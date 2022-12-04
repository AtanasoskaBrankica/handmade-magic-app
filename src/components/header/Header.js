import {Link, NavLink} from 'react-router-dom';
import classes from './Header.module.css';
import {GiShoppingCart} from 'react-icons/gi';

const logo = (
  <div className={classes.logo}>
    <Link to="/">Handmade Magic</Link>
  </div>
);

const cart = (
  <span className={classes.cart}>
    <Link to="/cart">
      Cart
      <GiShoppingCart size={20} />
      <p className="cartItems-number">0</p>
    </Link>
  </span>
);

const activeLink = ({isActive}) => (isActive ? `${classes.active}` : '');
const Header = () => {
  return (
    <header>
      <div className={classes.header}>
        {logo}
        <nav>
          <ul>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact us
              </NavLink>
            </li>
          </ul>
          <div className={classes['header-right']}>
            <span className={classes['header-right-links']}>
              <NavLink to="/login" className={activeLink}>
                Login
              </NavLink>
              <NavLink to="/register" className={activeLink}>
                Register
              </NavLink>
              <NavLink to="/order-history" className={activeLink}>
                My Orders
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
