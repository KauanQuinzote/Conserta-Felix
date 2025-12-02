"use client";

interface Props {
  onClick: () => void;
}

export default function AlterarButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors hover:scale-105 hover:shadow-lg transition duration-300"
    >
      Salvar Alterações
    </button>
  );
}
