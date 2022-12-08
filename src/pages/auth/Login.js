import React from 'react';
import classes from './Auth.module.css';
import loginImage from '../../assets/login.jpg';
import {Link} from 'react-router-dom';
import {AiOutlineGoogle} from 'react-icons/ai';
import Card from '../../components/card/Card';

const Login = () => {
  return (
    <section className={`${classes.container} ${classes['auth-wrapper']}`}>
      <div>
        <img src={loginImage} alt="Login Image" />
      </div>
      <Card>
        <div className={classes['wrapper-form']}>
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button style={{backgroundColor: 'deepskyblue'}}>Login</button>
            <div className={classes['reset-link']}>
              <Link to="/reset">Forggot Password</Link>
            </div>
            <p>-- or --</p>
          </form>
          <button style={{backgroundColor: 'orangered'}}>
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
  );
};

export default Login;
