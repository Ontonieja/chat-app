interface FormInputProps {
  type: string;
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function FormInput({
  type,
  value,
  name,
  placeholder,
  onChange,
}: FormInputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      id={name}
      value={value}
      className="w-full border-2 focus:outline-primary-blue hover:border-2 transition ease-in-out duration-200 hover:border-primary-blue bg-[#fafbfd] p-3 rounded-xl"
      onChange={onChange}
    ></input>
  );
}
