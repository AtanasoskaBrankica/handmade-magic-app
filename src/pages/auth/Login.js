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
  font-size: 1rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 1rem;
`;

const LoginBtnWithGoogle = styled.button`
  width: 73%;
  height: 10%;
  font-size: 1rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 1rem;
  background-color: orangered;
`;
const LoginTitle = styled.h2`
  text-align: center;
`;
const LoginForm = styled.form`
  height: 80%;
  text-align: center;
`;

const Input = styled.input`
  width: 70%;
  height: 10%;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const ResetLinkWrapper = styled.div`
  margin-top: 1rem;
  width: 50%;
`;

const ResetLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const RegisterWrapper = styled.div`
  width: 70%;
  height: 10%;
  margin-left: 3rem;
  display: flex;
  font-size: 1rem;
  margin-top: 1rem;
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
`;

const Text = styled.p`
  margin-top: 0rem;
`;
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
                  <ResetLink to="/reset">Forggot Password</ResetLink>
                </ResetLinkWrapper>
                <Text>-- or --</Text>
                <LoginBtnWithGoogle onClick={loginWithGoogle}>
                  <AiOutlineGoogle
                    color="white"
                    size="20"
                    style={{marginRight: '5px'}}
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