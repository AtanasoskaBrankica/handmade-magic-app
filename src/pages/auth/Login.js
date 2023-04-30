import React, {useState} from 'react';
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
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {selectPreviousURL} from '../../redux/slice/cartSlice';
import {AuthButton} from '../../components/shared/Button';
import {Input} from '../../components/shared/Input';
import {AuthWrapper} from '../../components/shared/Container';

const LoginWrapper = styled.div`
  width: 50%;
  padding-top: 7rem;
`;

const ImageWrapper = styled.div`
  width: 50%;
  padding-top: 6rem;
  text-align: right;
`;

const LoginFormWrapper = styled.div`
  width: 60%;
  height: 80%;
`;

const LoginTitle = styled.h2`
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 1rem;
  font-size: 1.5rem;
`;
const LoginForm = styled.form`
  height: 80%;
  text-align: center;
`;

const ResetLinkWrapper = styled.div`
  margin-top: 1rem;
  width: 50%;
`;

const ResetLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1rem;
  font-weight: bold;
`;

const RegisterWrapper = styled.div`
  width: 80%;

  height: 10%;
  margin-left: 1.3rem;
  display: flex;
  font-size: 16px;
  margin-top: 1rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
`;

const RegisterText = styled.div`
  width: 50%;
  text-align: right;
`;

const RegisterLinkWrapper = styled.div`
  width: 50%;
  text-align: left;
`;

const RegisterLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding-left: 3px;
`;

const Text = styled.p`
  margin-top: 0rem;
`;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const previousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();
  console.log('email', email);

  const redirectUser = () => {
    if (previousURL.includes('cart')) {
      navigate('/cart');
    } else {
      navigate('/');
    }
  };

  const loginHandler = event => {
    event.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        toast.success('Login Successful!');
        redirectUser();
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        toast.error(error.message);
      });

    setIsLoading(false);
  };

  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        toast.success('Login successfully!');
        redirectUser();
      })
      .catch(error => {
        toast.error(error.messagge);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <AuthWrapper>
        <ImageWrapper>
          <img src={loginImage} alt="Login Image" style={{width: '80%'}} />
        </ImageWrapper>
        <LoginWrapper>
          <LoginFormWrapper>
            <Card>
              <LoginTitle>Login</LoginTitle>
              <LoginForm onSubmit={loginHandler}>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />

                <AuthButton type="submit" background="cornflowerblue">
                  Login
                </AuthButton>
                <ResetLinkWrapper>
                  <ResetLink to="/reset">Forggot Password?</ResetLink>
                </ResetLinkWrapper>
                <Text>-- or --</Text>
                <AuthButton background="pink" onClick={loginWithGoogle}>
                  <AiOutlineGoogle
                    color="white"
                    size="20"
                    style={{marginRight: '5px', marginTop: '-4px'}}
                  />
                  Login With Google
                </AuthButton>
                <RegisterWrapper>
                  <RegisterText>Don't have an account? </RegisterText>
                  <RegisterLinkWrapper>
                    <RegisterLink to="/register">Register</RegisterLink>
                  </RegisterLinkWrapper>
                </RegisterWrapper>
              </LoginForm>
            </Card>
          </LoginFormWrapper>
        </LoginWrapper>
      </AuthWrapper>
    </>
  );
};

export default Login;
