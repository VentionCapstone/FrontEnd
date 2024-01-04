import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

function ButtonPrimary({ children, loading, disabled }: LoadingButtonProps) {
  return (
    <LoadingButton
      loading={loading}
      type="submit"
      size="large"
      variant="contained"
      color="error"
      sx={{ mt: 4 }}
      fullWidth
      disabled={disabled}
    >
      {children}
    </LoadingButton>
  );
}

export default ButtonPrimary;
