import React from 'react';
import forgotPasswordImage from '../../assets/forgot.jpg';
import Card from '../../components/card/Card';
import classes from './Auth.module.css';
const Reset = () => {
  return (
    <section className={`${classes.container} ${classes['auth-wrapper']}`}>
      <div>
        <img src={forgotPasswordImage} alt="Forgot Password Image" />
      </div>
      <Card>
        <div className={classes['wrapper-form']}>
          <h2>Reset Password</h2>
          <form>
            <input type="text" placeholder="Email" required />

            <button style={{backgroundColor: 'deepskyblue'}}>
              Reset Password
            </button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
