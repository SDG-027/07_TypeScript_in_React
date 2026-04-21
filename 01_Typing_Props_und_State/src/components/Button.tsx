type ButtonProps = {
  children: React.ReactNode;
  // onClick: () => void
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

// export default function Button({ children, onClick, className }: ButtonProps) {
//   return (
//     <button className={`myBtn ${className ? className: ""}`} onClick={onClick}>
//       {children}
//     </button>
//   );
// }
//
//
type IntrinsicButtonProps = React.ComponentProps<'button'> & {
  username: string;
};

export default function Button({
  username,
  children,
  onClick,
  className,
  ...rest
}: IntrinsicButtonProps) {
  return (
    <button
      className={`myBtn ${className ? className : ''}`}
      onClick={onClick}
      {...rest}
    >
      {username}: {children}
    </button>
  );
}
