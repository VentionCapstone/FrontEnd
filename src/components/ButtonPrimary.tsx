import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

function ButtonPrimary({ children, loading }: LoadingButtonProps) {
  return (
    <LoadingButton
      loading={loading}
      type="submit"
      size="large"
      variant="contained"
      color="error"
      sx={{ mt: 4 }}
      fullWidth
    >
      {children}
    </LoadingButton>
  );
}

export default ButtonPrimary;
