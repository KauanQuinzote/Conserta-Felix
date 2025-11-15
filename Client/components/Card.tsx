import React from "react";

export default function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="relative z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-md ring-1 ring-gray-100">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
}