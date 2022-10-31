import { ReactNode } from "react";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";

interface Props {
  icon?: ReactNode;
  iconRight?: boolean;
  title: string;
  type?: "button" | "submit" | "reset";
  color?: string;
  className?: string;
  textColor?: string;
  loading?: boolean;
  onClick?: () => any;
}

const Button: React.FC<Props> = ({
  loading,
  title,
  type,
  color,
  className = "",
  textColor,
  onClick,
  icon,
  iconRight,
}: Props) => {
  function handleClick() {
    if (onClick) onClick();
  }

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: color ? color : "none",
        color: textColor ? textColor : "none",
      }}
      disabled={loading}
      type={type || "submit"}
      className={`${className} ${
        color ? "" : "bg-secondary-blue hover:bg-[#1289d9]"
      } z-50 w-auto flex items-center gap-x-1 justify-center py-2 px-5 border border-transparent rounded-md shadow-md text-sm md:text-base font-medium text-white focus:outline-none duration-500`}
    >
      {icon && !iconRight && icon}
      {loading ? <Dots color="#FFF" size={16} /> : title}
      {icon && iconRight && icon}
    </button>
  );
};

export default Button;
