import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

function ButtonPrimary({ children, loading, disabled }: LoadingButtonProps) {
  return (
    <LoadingButton
      loading={loading}
      type="submit"
      size="large"
      variant="contained"
      sx={{
        'fontWeight': 600,
        'mt': 4,
        'bgcolor': 'secondary.main',
        ':hover': {
          bgcolor: 'secondary.dark',
        },
      }}
      fullWidth
      disabled={disabled}
    >
      {children}
    </LoadingButton>
  );
}

export default ButtonPrimary;
