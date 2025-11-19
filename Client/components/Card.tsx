import React from "react";
import ButtomReturn from "./ButtonReturn";
interface CardProps {
  title?: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
  return?: boolean;
}
export default function Card({ title, children, width, height, return: returnButton }: CardProps) {
  return (
    <div className="relative z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-md ring-1 ring-gray-100" style={{ width, height }}>
      {returnButton && <ButtomReturn />}
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
}