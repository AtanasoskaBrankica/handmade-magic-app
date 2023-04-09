import React, {useState} from 'react';
import styled from 'styled-components';
import Card from '../../components/card/Card';
import {CountryDropdown} from 'react-country-region-selector';
import {useDispatch, useSelector} from 'react-redux';
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

const CheckoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
`;

const RightWrapper = styled.div`
  width: 50%;
`;
const LeftWrapper = styled.div`
  width: 50%;
`;

const ShippingForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  margin-bottom: 1rem;
  font-weight: bold;
`;
const Input = styled.input`
  height: 40%;
  width: 30vw;
`;
const FormItem = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 1rem;

  width: 30vw;
`;

const ShippingWrapper = styled.div``;
const BillingWrapper = styled.div``;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: blue;
  color: white;
  font-size: 0.8rem;
  margin-left: 1rem;
  border: none;
  border-radius: 0.3rem;
`;
const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({...initialAddress});
  const [billingAddress, setBillingAddress] = useState({...initialAddress});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShippingAddress = event => {
    console.log('event', event);
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
      <h2>Checkout Details</h2>
      <CheckoutWrapper>
        <RightWrapper>
          {/* <Card> */}
          <ShippingForm onSubmit={handleSubmit}>
            <ShippingWrapper>
              <h3>Shipping Address</h3>
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
            </ShippingWrapper>
            <BillingWrapper>
              <h3>Billing Address</h3>
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

              <FormItem>
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
              </FormItem>
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
            </BillingWrapper>
            <Button type="submit">Proceed To Checkout</Button>
          </ShippingForm>
          {/* </Card> */}
          {/* <Card style={{}}> */}

          {/* </Card> */}
        </RightWrapper>
        <LeftWrapper>
          <CheckoutSummary />
        </LeftWrapper>
      </CheckoutWrapper>
    </Container>
  );
};

export default CheckoutDetails;
