import Image from "next/image";

interface FelixProps {
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function Felix({alt = 'Logo do Felix', className, width, height}: FelixProps) {
  return (
    <Image 
      src="/Felix.png" 
      alt={alt} 
      className={className}
      width={width}
      height={height}
    />
  );
}