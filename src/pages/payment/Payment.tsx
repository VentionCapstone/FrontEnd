import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import { FormEvent, useEffect, useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import httpClient from '../../api/httpClient';

const Payment = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);
  const bookingId = useParams().id;

  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await httpClient.post<string>('/payment', {
        bookingId,
        paymentOption: 'card',
      });
      localStorage.setItem('clientSecret', data);
      setShowForm(true);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <>
      {showForm && (
        <Elements stripe={stripePromise}>
          <PaymentForm bookingId={bookingId || ''} />
        </Elements>
      )}
    </>
  );
};
export default Payment;

function PaymentForm({ bookingId }: { bookingId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  const { mutate } = useMutation({
    mutationFn: async () => {
      const clientSecret = localStorage.getItem('clientSecret') || '';

      if (!stripe || !elements) return;

      const cardEl = elements.getElement(CardElement);

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl!,
        },
      });
      if (paymentIntent) {
        mutatePaymentConfirm(paymentIntent.status);
      }
    },
  });

  const { mutate: mutatePaymentConfirm } = useMutation({
    mutationFn: async (status: string) => {
      const { data } = await httpClient.post<{ success: 'boolean'; message: string }>(
        '/payment/confirm',
        {
          bookingId,
          status,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.removeItem('clientSecret');
      navigate('/');
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="card-element">Place order</label>
        <CardElement id="card-element" />
        <button>Pay</button>
      </form>
    </div>
  );
}
