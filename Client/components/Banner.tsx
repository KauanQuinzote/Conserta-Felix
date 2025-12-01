import Image from "next/image";

interface BannerProps {
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function Banner({alt = 'Banner - Conserta Félix', className, width, height}: BannerProps) {
  return (
    <Image 
      src="/Banner.png" 
      alt={alt} 
      className={className}
      width={width}
      height={height}
    />
  );
}
