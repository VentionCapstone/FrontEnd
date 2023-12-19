import LoadingButton from '@mui/lab/LoadingButton';

type ButtonPrimaryProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  loading?: boolean;
};

function ButtonPrimary({ children, loading }: ButtonPrimaryProps) {
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
