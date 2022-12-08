import React from 'react';
import classes from './Auth.module.css';
import registerImage from '../../assets/register.png';
import Card from '../../components/card/Card';
import {Link} from 'react-router-dom';

const Register = () => {
  return (
    <section className={`${classes.container} ${classes['auth-wrapper']}`}>
      <Card>
        <div className={classes['wrapper-form']}>
          <h2>Register</h2>
          <form>
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
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
  );
};

export default Register;
