type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  name: string;
  color: string;
  text: string;
  fullWidth?: boolean;
  rounded?: boolean;
  onClick?: () => void;
};

const Button = ({
  type,
  name,
  color,
  text,
  fullWidth,
  rounded,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`bg-${color} text-${text} ${fullWidth && 'w-full'} ${
          rounded && 'rounded'
        } px-4 py-3 mx-2 hover:underline`}>
        {name}
      </button>
    </>
  );
};

export default Button;
