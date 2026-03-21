interface Props {
  name: string;
  active?: boolean;
  onClick?: () => void;
}

export const Button = ({ name, active = false, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 m-1 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-150
        ${active
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
    >
      {name}
    </button>
  );
};
