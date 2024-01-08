import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { PaymentForm } from './components/PaymentForm';
import httpClient from '../../api/httpClient';
import { ResponsePayment } from '../../types/payment.types';
import ButtonPrimary from '../../components/button/ButtonPrimary';
import LoadingPrimary from '../../components/loader/LoadingPrimary';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);

const Payment = () => {
  const [paymentOption, setPaymentOption] = useState<string>('card');
  const navigate = useNavigate();

  const handlePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentOption((event.target as HTMLInputElement).value);
  };

  const bookingId = useParams().id;
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await httpClient.post<string | ResponsePayment>('/payment', {
        bookingId,
        paymentOption,
      });
      return data;
    },
    onSuccess: (data) => {
      if (typeof data === 'string') {
        localStorage.setItem('clientSecret', data);
      } else {
        toast.success(data.message);
        localStorage.removeItem('clientSecret');
        navigate('/');
      }
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const handlePaymentClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Box
      sx={{
        width: {
          sm: '80%',
          md: '50%',
          lg: '40%',
          xl: '30%',
        },
        marginX: 'auto',
      }}
    >
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Payment Option</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={paymentOption}
          onChange={handlePaymentChange}
        >
          <FormControlLabel value="card" control={<Radio />} label="Card" />
          <FormControlLabel value="cash" control={<Radio />} label="Cash" />
        </RadioGroup>
      </FormControl>
      {isPending ? (
        <LoadingPrimary height="10vh" />
      ) : paymentOption === 'card' ? (
        <Elements stripe={stripePromise}>
          <PaymentForm bookingId={bookingId || ''} />
        </Elements>
      ) : (
        <Box component={'form'} onSubmit={handlePaymentClick}>
          <ButtonPrimary loading={isPending}>Pay with cash</ButtonPrimary>
        </Box>
      )}
    </Box>
  );
};
export default Payment;
