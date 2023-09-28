import React, {useRef} from 'react';
import styled from 'styled-components';
import Card from '../../components/card/Card';
import {Btn} from '../../components/shared/Button';
import {BsFillTelephoneFill} from 'react-icons/bs';
import {MdOutlineEmail} from 'react-icons/md';
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify';
import {FormInput, FormItem, FormLabel} from '../../components/shared/Input';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
`;

const FormContainer = styled.div`
  width: 40%;
`;

const InformationContainer = styled.div`
  width: 50%;
`;

const TextArea = styled.textarea`
  width: 31vw;
  height: 100vh;
  border-radius: 8px;
  font-size: 1rem;
`;

const BtnWrapper = styled.div`
  width: 40%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const InformationContent = styled.div`
  background: cornflowerblue;
  width: 60%;
  padding: 1.5rem;
  color: white;
  height: 60%;
  font-size: 1.2rem;
  border-radius: 3%;
`;

const InformationItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const InformationLabel = styled.p`
  margin: 0;
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
`;

const TitlePage = styled.h1``;

const Container = styled.div`
  height: 68vh;
  padding-left: 8rem;
`;

const Contact = () => {
  const form = useRef();
  const sendEmailMessage = e => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_4xz1ada',
        'template_0lipp2i',
        form.current,
        '4awA9-NtfyFZPMhDd'
      )
      .then(
        result => {
          toast.success('Message sent successfully');
        },
        error => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <Container>
      <TitlePage>Contact us</TitlePage>
      <ContentContainer>
        <FormContainer>
          <Card>
            <form ref={form} onSubmit={sendEmailMessage}>
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                />
              </FormItem>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                />
              </FormItem>
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormInput
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />
              </FormItem>
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <TextArea name="message" />
              </FormItem>
              <BtnWrapper>
                <Btn>Send Message</Btn>
              </BtnWrapper>
            </form>
          </Card>
        </FormContainer>
        <InformationContainer>
          <InformationContent>
            <h2>Our Contact Information</h2>
            <p>Fill the form or contact us via other channels listed bellow</p>
            <div>
              <InformationItem>
                <BsFillTelephoneFill size={20} style={{marginTop: '0.2rem'}} />
                <InformationLabel>+389 70 638 001</InformationLabel>
              </InformationItem>
              <InformationItem>
                <MdOutlineEmail size={20} style={{marginTop: '0.2rem'}} />
                <InformationLabel>
                  handmade.magic0408@gmail.com
                </InformationLabel>
              </InformationItem>
            </div>
          </InformationContent>
        </InformationContainer>
      </ContentContainer>
    </Container>
  );
};

export default Contact;
