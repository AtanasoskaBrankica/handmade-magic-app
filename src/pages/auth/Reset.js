import React, {useState} from 'react';
import forgotPasswordImage from '../../assets/reset.jpg';
import Card from '../../components/card/Card';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../../firebase/config';
import {toast} from 'react-toastify';
import Loader from '../../components/loader/Loader';
import styled from 'styled-components';
import {AuthButton} from '../../components/shared/Button';
import {Input} from '../../components/shared/Input';
import {AuthWrapper} from '../../components/shared/Container';

const ResetWrapper = styled.div`
  width: 50%;
  padding-top: 10rem;
`;

const ImageWrapper = styled.div`
  width: 50%;
  padding-top: 1rem;
  text-align: right;
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
      <AuthWrapper>
        <ImageWrapper>
          <img
            src={forgotPasswordImage}
            style={{width: '80%'}}
            alt="Forgot Password Image"
          />
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
                <AuthButton background="cornflowerblue" type="submit">
                  Reset Password
                </AuthButton>
              </ResetForm>
            </Card>
          </ResetFormWrapper>
        </ResetWrapper>
      </AuthWrapper>
    </>
  );
};

export default Reset;
