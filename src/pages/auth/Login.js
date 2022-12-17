import React, {useState} from 'react';
import classes from './Auth.module.css';
import loginImage from '../../assets/login.jpg';
import {Link} from 'react-router-dom';
import {AiOutlineGoogle} from 'react-icons/ai';
import Card from '../../components/card/Card';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/config';
import {useNavigate} from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import {toast} from 'react-toastify';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = event => {
    event.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        toast.success('Login Successful!');
        navigate('/');
      })
      .catch(error => {
        toast.error(error.message);
      });

    setIsLoading(false);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        toast.success('Login successfully!');
        navigate('/');
      })
      .catch(error => {
        toast.error(error.messagge);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`${classes.container} ${classes['auth-wrapper']}`}>
        <div>
          <img src={loginImage} alt="Login Image" />
        </div>
        <Card>
          <div className={classes['wrapper-form']}>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              <button type="submit" style={{backgroundColor: 'deepskyblue'}}>
                Login
              </button>
              <div className={classes['reset-link']}>
                <Link to="/reset">Forggot Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              style={{backgroundColor: 'orangered'}}
              onClick={loginWithGoogle}
            >
              <AiOutlineGoogle
                color="white"
                size="20"
                style={{marginRight: '5px'}}
              />
              Login With Google
            </button>
            <span className={classes['wrapper-link']}>
              <p>Don't have an account? </p>
              <Link className={classes.link} to="/register">
                Register
              </Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
