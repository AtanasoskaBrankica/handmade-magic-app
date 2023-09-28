import {useState} from 'react';
import {Link, NavLink, useLocation, useParams} from 'react-router-dom';
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
  background-color:#C1B199;
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
  width: 18%;
  height: 8rem;
  display: flex;
  justify-content: space-between;
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Dancing+Script:wght@600;700&family=Exo+2:wght@300&family=Karla:wght@200&family=Montserrat+Alternates:ital,wght@0,500;1,900&family=PT+Serif&family=Playfair+Display:ital@1&family=Quicksand:wght@400;500&family=Roboto:wght@100&family=Space+Grotesk&family=Ysabeau:ital,wght@0,1;0,900;1,1;1,900;1,1000&display=swap');
  font-family: 'Ysabeau', sans-serif;
  font-weight: bold;
`;

const RightWrapper = styled.div`
  height: 8rem;
  display: flex;
  justify-content: space-between;
  width: 25%;
  font-weight: bold;
  width: 32%;
  padding-left: 3rem;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 2.5rem;
  @import url('https://fonts.googleapis.com/css2?family=Karla:wght@200&family=PT+Serif&family=Playfair+Display:ital@1&family=Quicksand:wght@300&family=Roboto:wght@100&display=swap');

  font-family: 'Dancing Script', cursive, 'Karla', sans-serif,
    'Playfair Display', serif, 'PT Serif', serif, 'Quicksand', sans-serif,
    'Roboto', sans-serif;
`;

const Admin = styled.div`
  flex: 1;
  text-align: center;
  padding-top: 3rem;
`;

const Home = styled.div`
  flex: 1;
  text-align: center;
  padding-top: 3rem;
`;

const ContactUs = styled.div`
  flex: 1;
  text-align: center;
  padding-top: 3rem;
`;

const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Dancing+Script:wght@600;700&family=Exo+2:ital,wght@0,300;0,400;1,300&family=Kanit:wght@300&family=Karla:wght@200&family=Montserrat+Alternates:ital,wght@0,500;1,900&family=PT+Serif&family=Playfair+Display:ital@1&family=Poltawski+Nowy:ital@1&family=Quicksand:wght@400;500&family=Roboto:wght@100&family=Space+Grotesk&family=Ysabeau:ital,wght@0,1;0,900;1,1;1,900;1,1000&display=swap');
  font-family: 'Dancing Script', cursive;
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Dancing+Script:wght@600;700&family=Exo+2:ital,wght@0,300;0,400;1,300&family=Kanit:wght@300&family=Karla:wght@200&family=Montserrat+Alternates:ital,wght@0,500;1,900&family=PT+Serif&family=Playfair+Display:ital@1&family=Poltawski+Nowy:ital@1&family=Quicksand:wght@400;500&family=Roboto:wght@100&family=Space+Grotesk&family=Ysabeau:ital,wght@0,1;0,900;1,1;1,900;1,1000&display=swap');
  font-family: 'Dancing Script', cursive;
`;

const HeaderUserLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Dancing+Script:wght@600;700&family=Exo+2:ital,wght@0,300;0,400;1,300&family=Kanit:wght@300&family=Karla:wght@200&family=Montserrat+Alternates:ital,wght@0,500;1,900&family=PT+Serif&family=Playfair+Display:ital@1&family=Poltawski+Nowy:ital@1&family=Quicksand:wght@400;500&family=Roboto:wght@100&family=Space+Grotesk&family=Ysabeau:ital,wght@0,1;0,900;1,1;1,900;1,1000&display=swap');
  font-family: 'Dancing Script', cursive;
  padding-right: 7px;
`;

const UserName = styled.div`
  width: 23%;
  text-align: center;
  padding-top: 3rem;
`;

const Orders = styled.div`
  width: 20%;
  text-align: center;
  padding-top: 3rem;
  b
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
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Dancing+Script:wght@600;700&family=Exo+2:ital,wght@0,300;0,400;1,300&family=Kanit:wght@300&family=Karla:wght@200&family=Montserrat+Alternates:ital,wght@0,500;1,900&family=PT+Serif&family=Playfair+Display:ital@1&family=Poltawski+Nowy:ital@1&family=Quicksand:wght@400;500&family=Roboto:wght@100&family=Space+Grotesk&family=Ysabeau:ital,wght@0,1;0,900;1,1;1,900;1,1000&display=swap');
  font-family: 'Dancing Script', cursive;
  background: none;
  color: white;
  font-weight: bold;
  text-decoration: underline;
`;

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const [scrollPage, setScrollPage] = useState(false);
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const location = useLocation();
  const pathname = location.pathname;
  const url = window.location.href;

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY);
  }, []);

  const fixNavBar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  window.addEventListener('scroll', fixNavBar);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        if (user.displayName === null) {
          const atIndex = user.email.indexOf('@');
          const username = user.email.substring(0, atIndex).split('.')[0];
          const finalUserName =
            username.charAt(0).toUpperCase() + username.slice(1);

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
          <ShowOnLogin>
            <HeaderUserLink href="#home">
              <FaUserAlt size={15} />
              Hi,{userName}
            </HeaderUserLink>
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
          <ShowOnLogin>
            <HeaderLink to="/cart">
              Cart
              <GiShoppingCart size={20} />
              <CartNumber>{cartTotalQuantity}</CartNumber>
            </HeaderLink>
          </ShowOnLogin>
        </Cart>
        <UserName>
          <ShowOnLogout>
            <HeaderNavLink to="/login">Login</HeaderNavLink>
          </ShowOnLogout>
        </UserName>
      </RightWrapper>
    </HeaderWrapper>
  );
};

export default Header;
