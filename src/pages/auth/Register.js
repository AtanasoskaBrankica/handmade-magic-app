import React, {useState} from 'react';
import classes from './Auth.module.css';
import registerImage from '../../assets/register.png';
import Card from '../../components/card/Card';
import {Link} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/config';
import Loader from '../../components/loader/Loader';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const registerHandler = event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        toast.success('Registration was successful');
        navigate('/login');
      })
      .catch(error => {
        toast.error(error.message);
      });
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`${classes.container} ${classes['auth-wrapper']}`}>
        <Card>
          <div className={classes['wrapper-form']}>
            <h2>Register</h2>
            <form onSubmit={registerHandler}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
              />
              <button style={{backgroundColor: 'deepskyblue'}}>Register</button>
            </form>

            <span className={classes['wrapper-link']}>
              <p>Already have an account? </p>
              <Link className={classes.link} to="/login">
                Login
              </Link>
            </span>
          </div>
        </Card>
        <div>
          <img
            src={registerImage}
            alt="Register Image"
            style={{marginLeft: '150px'}}
          />
        </div>
      </section>
    </>
  );
};

export default Register;
