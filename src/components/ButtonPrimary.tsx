import LoadingButton from '@mui/lab/LoadingButton';

type ButtonPrimaryProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disbabled?: boolean;
  loading?: boolean | undefined;
};

function ButtonPrimary({ children }: ButtonPrimaryProps) {
  return (
    <LoadingButton
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
