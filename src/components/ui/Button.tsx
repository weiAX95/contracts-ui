// components/CustomButton.tsx
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  padding: '12px 48px',
  backgroundColor: '#48e59b',
  borderRadius: '9999px',
  color: 'rgba(0, 0, 0, 0.8)',
  fontSize: '16px',
  fontWeight: 500,
  fontFamily: 'Roboto Mono',
  lineHeight: 1,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#48e59b',
  },
});

export interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const SearchButton: React.FC<CustomButtonProps> = ({ children, onClick }) => {
  return (
    <CustomButton disableElevation onClick={onClick}>
      {children}
    </CustomButton>
  );
};

export default SearchButton;
