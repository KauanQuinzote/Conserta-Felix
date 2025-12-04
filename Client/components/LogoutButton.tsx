"use client";

interface Props {
  onClick: () => void;
}

export default function LogoutButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors hover:scale-105 hover:shadow-lg transition duration-300"
    >
      Sair
    </button>
  );
}
