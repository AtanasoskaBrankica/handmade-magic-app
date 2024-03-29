import React, {useState} from 'react';
import styled from 'styled-components';
import Card from '../../components/card/Card';
import {CountryDropdown} from 'react-country-region-selector';
import {useDispatch} from 'react-redux';
import {SAVE_SHIPPING_ADDRESS} from '../../redux/slice/checkoutSlice';
import {useNavigate} from 'react-router-dom';
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary';
import {Btn} from '../../components/shared/Button';
import {FormInput, FormItem, FormLabel} from '../../components/shared/Input';

const initialAddress = {
  name: '',
  line1: '',
  city: '',
  postal_code: '',
  country: '',
  phone: '',
};

const Container = styled.div``;

const CheckoutTitle = styled.h1`
  padding-left: 3rem;
  padding-bottom: 1rem;
  font-size: 1.5rem;
`;

const CheckoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
  font-size: 1.2rem;
  padding-left: 3rem;
`;

const LeftWrapper = styled.div`
  width: 50%;
  padding: 1rem;
`;

const RightWrapper = styled.div``;

const ShippingForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div``;

const Title = styled.h2`
  padding-left: 1rem;
  font-size: 1.3rem;
`;

const BtnWrapper = styled.div`
  margin-top: 1rem;
`;

const LeftCardContainer = styled.div`
  width: 40%;
  margin-right: 5rem;
`;

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({...initialAddress});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShippingAddress = event => {
    const {name, value} = event.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    navigate('/checkout');
  };

  return (
    <Container>
      <CheckoutTitle>Checkout Details</CheckoutTitle>
      <CheckoutWrapper>
        <Card>
          <LeftWrapper>
            <ShippingForm onSubmit={handleSubmit}>
              <Wrapper>
                <Title>Shipping Address</Title>
                <FormItem>
                  <FormLabel>Recipient Name and Surname:</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    placeholder="Recipient Name"
                    value={shippingAddress.name}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <FormLabel>Address:</FormLabel>
                  <FormInput
                    type="text"
                    name="line1"
                    placeholder="Address"
                    value={shippingAddress.line1}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <FormLabel>City:</FormLabel>
                  <FormInput
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <FormLabel>Postal Code:</FormLabel>
                  <FormInput
                    type="text"
                    name="postal_code"
                    placeholder="Postal Code"
                    value={shippingAddress.postal_code}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <CountryDropdown
                    valueType="short"
                    style={{
                      fontSize: '1rem',
                      marginTop: '0.5rem',
                      width: '430px',
                      padding: '1rem',
                      borderRadius: '10px',
                    }}
                    value={shippingAddress.country}
                    onChange={value =>
                      handleShippingAddress({
                        target: {
                          name: 'country',
                          value,
                        },
                      })
                    }
                  />
                </FormItem>
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormInput
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={shippingAddress.phone}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
              </Wrapper>
              <BtnWrapper>
                <Btn type="submit">Proceed To Checkout</Btn>
              </BtnWrapper>
            </ShippingForm>
          </LeftWrapper>
        </Card>
        <LeftCardContainer>
          <Card>
            <RightWrapper>
              <CheckoutSummary />
            </RightWrapper>
          </Card>
        </LeftCardContainer>
      </CheckoutWrapper>
    </Container>
  );
};

export default CheckoutDetails;
