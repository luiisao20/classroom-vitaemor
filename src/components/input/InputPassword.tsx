import { useState, type InputHTMLAttributes } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  password: string;
  label?: string;

  onChangeText: (text: string) => void;
}
export const InputPassword = ({
  label = "Contraseña",
  password,

  onChangeText,
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative">
      <input
        {...rest}
        type={showPassword ? "text" : "password"}
        id="floating_password"
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border border-secondary rounded-xl border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
        placeholder=" "
        value={password}
        onChange={(e) => onChangeText(e.target.value)}
      />
      <label
        htmlFor="floating_password"
        className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
      <div
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-primary"
      >
        {!showPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
      </div>
    </div>
  );
};
