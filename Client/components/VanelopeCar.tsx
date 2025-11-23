import Image from "next/image";

interface CarProps {
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function VanelopeCar({alt = 'Carro da Vanelope', className, width, height}: CarProps) {
    return (
      <Image 
        src="/VanelopeCar.png" 
        alt={alt} 
        className={className}
        width={width}
        height={height}
      />
    );
}