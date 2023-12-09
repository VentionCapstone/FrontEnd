import { Button } from '@mui/material';

type ButtonPrimaryProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

function ButtonPrimary({ children }: ButtonPrimaryProps) {
  return (
    <Button type="submit" size="large" variant="contained" color="error" sx={{ mt: 4 }} fullWidth>
      {children}
    </Button>
  );
}

export default ButtonPrimary;
