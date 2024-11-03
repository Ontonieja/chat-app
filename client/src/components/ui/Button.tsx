export default function Button({
  children,
  className,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      className={`${className} bg-primary-blue text-white py-3 md:py-4 rounded-xl transition easy-in-out duration-300 hover:bg-primary-hover`}
      type={type}
    >
      {children}
    </button>
  );
}
