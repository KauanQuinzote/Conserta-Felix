import Image from "next/image";

export default function Felix({width, height}: {width?: number; height?: number }) {
    return (
        <div className="flex">
            <Image
                src="/felix.png"
                alt="Conserta Felix"
                width={width}
                height={height}
            />
        </div>
    );
}