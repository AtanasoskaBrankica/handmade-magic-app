import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import classes from './Header.module.css';
import {GiShoppingCart} from 'react-icons/gi';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase/config';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {FaUserAlt} from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} from '../../redux/slice/authSlice';
import {ShowOnLogin, ShowOnLogout} from '../hiddenLink/HiddenLink';

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
  const navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const dispatch = useDispatch();
  //Monitor currently sign-in user
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        if (user.displayName === null) {
          const userName = user.email.substring(0, user.email.indexOf('@'));
          const finalUserName =
            userName.charAt(0).toUpperCase() + userName.slice(1);
          setUsername(finalUserName);
        } else {
          setUsername(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : userName,
            userId: user.uid,
          })
        );
      } else {
        setUsername('');
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, userName]);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout successfully!');
        navigate('/');
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

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
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href="#home">
                  <FaUserAlt />
                  Hi, {userName}
                </a>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/" onClick={logoutHandler}>
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
