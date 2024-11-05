export default function Button({
  children,
  className,
  type,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      className={`${className} bg-primary-blue text-white py-3 md:py-4 rounded-xl transition easy-in-out duration-300 hover:bg-primary-hover`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
