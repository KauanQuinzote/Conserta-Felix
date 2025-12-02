"use client";
interface Props {
  onClick: () => void;
}

export default function DeleteButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-black transition-colors hover:scale-105 hover:shadow-lg transition duration-300"
    >
      Excluir Conta
    </button>
  );
}
