import React, {useState} from 'react';
import forgotPasswordImage from '../../assets/forgot.jpg';
import Card from '../../components/card/Card';
import classes from './Auth.module.css';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../../firebase/config';
import {toast} from 'react-toastify';
import Loader from '../../components/loader/Loader';
const Reset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const resetPasswordHandler = event => {
    event.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Check your email for a reset link');
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
        <div>
          <img src={forgotPasswordImage} alt="Forgot Password Image" />
        </div>
        <Card>
          <div className={classes['wrapper-form']}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPasswordHandler}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
              />

              <button type="submit" style={{backgroundColor: 'deepskyblue'}}>
                Reset Password
              </button>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
