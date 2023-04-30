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

const AuthWrapper = styled.div`
  height: 70vh;
  display: flex;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  width: 50%;
  padding-top: 6rem;
  text-align: right;
`;

const LoginWrapper = styled.div`
  width: 50%;
  padding-top: 7rem;
`;

const LoginFormWrapper = styled.div`
  width: 60%;
  height: 80%;
`;

const LoginButton = styled.button`
  width: 73%;
  height: 10%;
  font-size: 1.2rem;
  background: cornflowerblue;
  border: none;
  color: white;
  border-radius: 1rem;
  padding: 0.5rem;
`;

const LoginBtnWithGoogle = styled.button`
  width: 73%;
  height: 10%;
  font-size: 1.2rem;
  background-color: pink;
  border: none;
  color: white;
  border-radius: 1rem;
  padding: 0.5rem;
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

const Input = styled.input`
  width: 70%;
  height: 10%;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid grey;
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
        const user = userCredential.user;
        toast.success('Login Successful!');
        redirectUser();
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
                <LoginButton type="submit">Login</LoginButton>
                <ResetLinkWrapper>
                  <ResetLink to="/reset">Forggot Password?</ResetLink>
                </ResetLinkWrapper>
                <Text>-- or --</Text>
                <LoginBtnWithGoogle onClick={loginWithGoogle}>
                  <AiOutlineGoogle
                    color="white"
                    size="20"
                    style={{marginRight: '5px', marginTop: '-4px'}}
                  />
                  Login With Google
                </LoginBtnWithGoogle>
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
