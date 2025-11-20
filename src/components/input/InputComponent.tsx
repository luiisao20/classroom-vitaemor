import { type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  id: string;
  label: string;

  onChangeText: (text: string) => void;
}
export const InputComponent = ({
  id,
  label,
  text,

  onChangeText,
  ...rest
}: Props) => {
  return (
    <div className="relative">
      <input
        {...rest}
        type="text"
        id={`floating_${id}`}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border border-secondary rounded-xl border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
        placeholder=" "
        value={text}
        onChange={(e) => onChangeText(e.target.value)}
      />
      <label
        htmlFor={`floating_${id}`}
        className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};
