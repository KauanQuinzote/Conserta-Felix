
export default function ButtonGo({ onClick, text }: { onClick: () => void ; text: string }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
    >
      {text}    
    </button>
  );
}