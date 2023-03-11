import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {GiShoppingCart} from 'react-icons/gi';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase/config';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {FaUserAlt} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} from '../../redux/slice/authSlice';
import {ShowOnLogin, ShowOnLogout} from '../hiddenLink/HiddenLink';
import {AdminLink} from '../adminRoute/AdminRoute';
import styled from 'styled-components';
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from '../../redux/slice/cartSlice';

const HeaderWrapper = styled.header`
  height: 8rem;
  background-color: antiquewhite;
  color: black;
  display: flex;
  justify-content: space-between;
  padding-right: 2rem;
  width: ${props => (props.scrollPage ? '100%' : null)}
  position: ${props => (props.scrollPage ? 'fixed' : null)}
  top: ${props => (props.scrollPage ? '0' : null)}
  transition: ${props => (props.scrollPage ? 'all 0.5s' : null)}
  z-index: ${props => (props.scrollPage ? '9' : null)};
`;

const LeftWrapper = styled.div`
  width: 25%;
  height: 8rem;
`;

const LogoWrapper = styled.div`
  padding-top: 2rem;
  padding-left: 4rem;
`;

const MiddleWrapper = styled.div`
  width: 25%;
  height: 8rem;

  display: flex;
  justify-content: space-between;
`;

const RightWrapper = styled.div`
  height: 8rem;
  display: flex;
  justify-content: space-between;
  width: 25%;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 2rem;
`;

const Admin = styled.div`
  width: 20%;
  text-align: center;
  padding-top: 2rem;
`;

const Home = styled.div`
  width: 20%;
  text-align: center;
  padding-top: 3rem;
`;

const ContactUs = styled.div`
  width: 20%;
  text-align: center;
  padding-top: 3rem;
`;

const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const UserName = styled.div`
  width: 20%;
  text-align: center;
  padding-top: 3rem;
`;

const Orders = styled.div`
  width: 20%;
  text-align: center;
  padding-top: 3rem;
`;

const Logout = styled.div`
  width: 20%;
  text-align: center;
  padding-top: 3rem;
`;

const Cart = styled.div`
  width: 20%;

  padding-top: 3rem;
`;

const CartNumber = styled.span`
  width: 10%;
`;

const AdminButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  font-size: 1rem;
  border-radius: 1rem;
  cursor: pointer;
`;

// const activeLink = ({isActive}) => (isActive ? `${classes.active}` : '');
const Header = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const [scrollPage, setScrollPage] = useState(false);
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const fixNavBar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  window.addEventListener('scroll', fixNavBar);

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
    <HeaderWrapper scrollPage={scrollPage}>
      <LeftWrapper>
        <LogoWrapper>
          <LogoLink to="/">Handmade Magic</LogoLink>
        </LogoWrapper>
      </LeftWrapper>
      <MiddleWrapper>
        <Admin>
          <AdminLink>
            <Link to="/admin/home">
              <AdminButton>Admin</AdminButton>
            </Link>
          </AdminLink>
        </Admin>
        <Home>
          <HeaderNavLink to="/">Home</HeaderNavLink>
        </Home>
        <ContactUs>
          <HeaderNavLink to="/contact">Contact us</HeaderNavLink>
        </ContactUs>
      </MiddleWrapper>
      <RightWrapper>
        <UserName>
          <ShowOnLogout>
            <HeaderNavLink to="/login">Login</HeaderNavLink>
          </ShowOnLogout>
          <ShowOnLogin>
            <HeaderLink href="#home">
              <FaUserAlt />
              Hi, {userName}
            </HeaderLink>
          </ShowOnLogin>
        </UserName>
        <Orders>
          <ShowOnLogin>
            <HeaderNavLink to="/order-history">My Orders</HeaderNavLink>
          </ShowOnLogin>
        </Orders>
        <Logout>
          <ShowOnLogin>
            <HeaderNavLink to="/" onClick={logoutHandler}>
              Logout
            </HeaderNavLink>
          </ShowOnLogin>
        </Logout>
        <Cart>
          <HeaderLink to="/cart">
            Cart
            <GiShoppingCart size={20} />
            <CartNumber>{cartTotalQuantity}</CartNumber>
          </HeaderLink>
        </Cart>
      </RightWrapper>
    </HeaderWrapper>
  );
};

export default Header;
