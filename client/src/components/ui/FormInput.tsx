interface FormInputProps {
  type: string;
  value?: string;
  defaultValue?: string;
  name: string;
  placeholder: string;
}
export default function FormInput({
  type,
  value,
  defaultValue,
  name,
  placeholder,
}: FormInputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      id={name}
      value={value}
      defaultValue={defaultValue}
      className="w-full border-2 focus:outline-primary-blue hover:border-2 transition ease-in-out duration-200 hover:border-primary-blue bg-[#fafbfd] p-3 rounded-xl"
    ></input>
  );
}
