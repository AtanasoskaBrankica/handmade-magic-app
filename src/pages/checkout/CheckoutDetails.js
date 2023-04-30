import React, {useState} from 'react';
import styled from 'styled-components';
import Card from '../../components/card/Card';
import {CountryDropdown} from 'react-country-region-selector';
import {useDispatch} from 'react-redux';
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from '../../redux/slice/checkoutSlice';
import {useNavigate} from 'react-router-dom';
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary';

const initialAddress = {
  name: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
  phone: '',
};

const Container = styled.div``;

const CheckoutTitle = styled.h1`
  padding-left: 3rem;
  padding-bottom: 1rem;
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
const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;
const Input = styled.input`
  height: 40%;
  width: 30vw;
  border-radius: 10px;
  padding: 0.5rem;
  font-size: 1.2rem;
`;
const FormItem = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 1rem;
  margin-top: 1rem;
  width: 30vw;
  margin-right: 2rem;
`;

const FormItemDropdown = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 1rem;
  margin-top: 1rem;
  width: 30vw;
`;

const Wrapper = styled.div``;
const Title = styled.h2`
  padding-left: 1rem;
  font-size: 2rem;
`;

const Button = styled.button`
  background: cornflowerblue;
  color: white;
  width: 70%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1.2rem;
  border-radius: 10px;
  margin-left: 1rem;
  border: none;
  margin-top: 1rem;
`;

const LeftCardContainer = styled.div`
  width: 40%;
  margin-right: 5rem;
`;

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({...initialAddress});
  const [billingAddress, setBillingAddress] = useState({...initialAddress});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShippingAddress = event => {
    const {name, value} = event.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBillingAddress = event => {
    const {name, value} = event.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
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
                  <Label>Recipient Name:</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Recipient Name"
                    value={shippingAddress.name}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <Label>Address Line 1:</Label>
                  <Input
                    type="text"
                    name="line1"
                    placeholder="Address Line 1"
                    value={shippingAddress.line1}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <Label>Address Line 2:</Label>
                  <Input
                    type="text"
                    name="line2"
                    placeholder="Address Line 2"
                    value={shippingAddress.line2}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <Label>City:</Label>
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <Label>State:</Label>
                  <Input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <Label>Postal Code:</Label>
                  <Input
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
                  <Label>Phone:</Label>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={shippingAddress.phone}
                    onChange={event => handleShippingAddress(event)}
                  />
                </FormItem>
              </Wrapper>
              <Wrapper>
                <Title>Billing Address</Title>
                <FormItem>
                  <Label>Name:</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Recipient Name"
                    value={billingAddress.name}
                    onChange={event => handleBillingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <Label>Address Line 1:</Label>
                  <Input
                    type="text"
                    name="line1"
                    placeholder="Address Line 1"
                    value={billingAddress.line1}
                    onChange={event => handleBillingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <Label>Address Line 2:</Label>
                  <Input
                    type="text"
                    name="line2"
                    placeholder="Address Line 2"
                    value={billingAddress.line2}
                    onChange={event => handleBillingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <Label>City:</Label>
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={billingAddress.city}
                    onChange={event => handleBillingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <Label>State:</Label>
                  <Input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={billingAddress.state}
                    onChange={event => handleBillingAddress(event)}
                  />
                </FormItem>
                <FormItem>
                  <Label>Postal Code:</Label>
                  <Input
                    type="text"
                    name="postal_code"
                    placeholder="Postal Code"
                    value={billingAddress.postal_code}
                    onChange={event => handleBillingAddress(event)}
                  />
                </FormItem>

                <FormItemDropdown>
                  <CountryDropdown
                    valueType="short"
                    value={billingAddress.country}
                    onChange={value =>
                      handleBillingAddress({
                        target: {
                          name: 'country',
                          value,
                        },
                      })
                    }
                  />
                </FormItemDropdown>
                <FormItem>
                  <Label>Phone:</Label>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={billingAddress.phone}
                    onChange={event => handleBillingAddress(event)}
                  />
                </FormItem>
              </Wrapper>
              <Button type="submit">Proceed To Checkout</Button>
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
