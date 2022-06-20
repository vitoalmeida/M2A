import { ReactNode } from "react";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";

interface Props {
  icon?: ReactNode;
  title: string;
  color?: string;
  loading?: boolean;
  onClick?: () => any;
}

const Button: React.FC<Props> = ({
  loading,
  title,
  color,
  onClick,
  icon,
}: Props) => {
  function handleClick() {
    if (onClick) onClick();
  }

  return (
    <div onClick={handleClick}>
      <button
        style={{ backgroundColor: color ? color : "none" }}
        disabled={loading}
        type="submit"
        className={`${
          color ? "" : "bg-secondary-blue hover:bg-[#1289d9]"
        } w-full flex items-center gap-x-1 justify-center py-2 px-5 border border-transparent rounded-md shadow-md text-sm md:text-base font-medium text-white focus:outline-none duration-500`}
      >
        {icon && icon}
        {loading ? <Dots color="#FFF" size={16} /> : title}
      </button>
    </div>
  );
};

export default Button;
