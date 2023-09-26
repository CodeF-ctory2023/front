import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  text: string;
  handleClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ variant, text, handleClick, ...rest }) => {
  return (
    <Button variant={variant} onClick={handleClick} {...rest}>
      {text}
    </Button>
  );
};

export default CustomButton;
