import React, {useState} from 'react';
import forgotPasswordImage from '../../assets/forgot.jpg';
import Card from '../../components/card/Card';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../../firebase/config';
import {toast} from 'react-toastify';
import Loader from '../../components/loader/Loader';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 70vh;
  display: flex;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  width: 50%;
  padding-top: 1rem;
  text-align: right;
`;

const ResetWrapper = styled.div`
  width: 50%;
  padding-top: 10rem;
`;

const ResetFormWrapper = styled.div`
  width: 60%;
  height: 80%;
`;

const ResetTitle = styled.h2`
  text-align: center;
  padding-top: 0.5rem;
`;
const ResetForm = styled.form`
  height: 80%;
  text-align: center;
  padding-bottom: 2rem;
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

const ResetButton = styled.button`
  width: 73%;
  height: 10%;
  font-size: 1.2rem;
  background: dodgerblue;
  border: none;
  color: white;
  border-radius: 1rem;
  padding: 0.5rem;
`;
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
      <Wrapper>
        <ImageWrapper>
          <img src={forgotPasswordImage} alt="Forgot Password Image" />
        </ImageWrapper>
        <ResetWrapper>
          <ResetFormWrapper>
            <Card>
              <ResetTitle>Reset Password</ResetTitle>
              <ResetForm onSubmit={resetPasswordHandler}>
                <Input
                  type="text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
                <ResetButton type="submit">Reset Password</ResetButton>
              </ResetForm>
            </Card>
          </ResetFormWrapper>
        </ResetWrapper>
      </Wrapper>
    </>
  );
};

export default Reset;
